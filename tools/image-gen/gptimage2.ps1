param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Prompt,

  [Parameter(Position = 1)]
  [string]$Output = "gptimage2-output.png",

  [Parameter(Position = 2)]
  [string]$Size = "1024x1024",

  [Parameter(Position = 3)]
  [string]$Quality = "high",

  [Parameter(Position = 4)]
  [string]$Format = "png"
)

$ErrorActionPreference = "Stop"

function Import-LocalEnvironmentFile {
  param([string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  foreach ($line in Get-Content -LiteralPath $Path) {
    $trimmed = $line.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
      continue
    }

    $separatorIndex = $trimmed.IndexOf("=")
    if ($separatorIndex -lt 1) {
      continue
    }

    $name = $trimmed.Substring(0, $separatorIndex).Trim()
    $value = $trimmed.Substring($separatorIndex + 1).Trim()
    if ($value.Length -ge 2 -and (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'")))) {
      $value = $value.Substring(1, $value.Length - 2)
    }

    if (-not [string]::IsNullOrWhiteSpace($name) -and [string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($name, "Process"))) {
      [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
  }
}

function Get-FirstEnvironmentValue {
  param([string[]]$Names)

  foreach ($name in $Names) {
    foreach ($target in @("Process", "User", "Machine")) {
      $value = [Environment]::GetEnvironmentVariable($name, $target)
      if (-not [string]::IsNullOrWhiteSpace($value)) {
        return $value
      }
    }
  }

  return $null
}

function Redact-SecretText {
  param([string]$Text)

  if ($null -eq $Text) {
    return ""
  }

  return ($Text -replace "sk-[A-Za-z0-9_-]{6,}", "sk-***REDACTED***")
}

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Import-LocalEnvironmentFile (Join-Path $scriptDirectory "gptimage2.env")

$baseUrl = Get-FirstEnvironmentValue @("GPTIMAGE2_BASE_URL", "IMAGE2_BASE_URL", "OPENAI_BASE_URL")
$apiKey = Get-FirstEnvironmentValue @("GPTIMAGE2_API_KEY", "IMAGE2_API_KEY", "OPENAI_API_KEY")
$model = Get-FirstEnvironmentValue @("GPTIMAGE2_MODEL", "IMAGE2_MODEL")

if ([string]::IsNullOrWhiteSpace($model)) {
  $model = "gpt-image-2"
}

if ([string]::IsNullOrWhiteSpace($baseUrl) -or [string]::IsNullOrWhiteSpace($apiKey)) {
  Write-Error "Missing GPTIMAGE2_BASE_URL or GPTIMAGE2_API_KEY."
  exit 2
}

$base = $baseUrl.TrimEnd("/")
if (-not ([Uri]$base).AbsolutePath.TrimEnd("/").EndsWith("/v1")) {
  $base = "$base/v1"
}

$endpoint = "$base/images/generations"
$resolvedOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not [string]::IsNullOrWhiteSpace($outputDirectory)) {
  New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
}

$payload = [ordered]@{
  model = $model
  prompt = $Prompt
  size = $Size
  quality = $Quality
  output_format = $Format
  response_format = "b64_json"
}

$payloadPath = Join-Path ([System.IO.Path]::GetTempPath()) ("gptimage2-payload-{0}.json" -f ([Guid]::NewGuid().ToString("N")))
$marker = "`n__GPTIMAGE2_HTTP_STATUS__:"

try {
  $payload | ConvertTo-Json -Depth 8 -Compress | Set-Content -LiteralPath $payloadPath -Encoding UTF8

  $curlArgs = @(
    "-sS",
    "-L",
    "--max-time",
    "300",
    "-w",
    "$marker%{http_code}",
    "-H",
    "Authorization: Bearer $apiKey",
    "-H",
    "Content-Type: application/json",
    "--data-binary",
    "@$payloadPath",
    $endpoint
  )

  $response = & curl.exe @curlArgs
  if ($LASTEXITCODE -ne 0) {
    throw "curl exited with $LASTEXITCODE"
  }

  $responseText = $response -join "`n"
  $markerIndex = $responseText.LastIndexOf($marker)
  if ($markerIndex -lt 0) {
    throw "curl response did not include an HTTP status marker"
  }

  $body = $responseText.Substring(0, $markerIndex)
  $statusText = $responseText.Substring($markerIndex + $marker.Length).Trim()
  $statusCode = [int]$statusText

  if ($statusCode -ge 400) {
    $preview = Redact-SecretText $body
    if ($preview.Length -gt 1200) {
      $preview = $preview.Substring(0, 1200) + "...<truncated>"
    }
    throw "HTTP ${statusCode}: $preview"
  }

  $result = $body | ConvertFrom-Json
  $image = $result.data[0]
  if ([string]::IsNullOrWhiteSpace($image.b64_json)) {
    throw "Image response did not include b64_json."
  }

  [System.IO.File]::WriteAllBytes($resolvedOutput, [Convert]::FromBase64String($image.b64_json))
  Write-Output $resolvedOutput
} catch {
  Write-Error ("Image request failed: " + (Redact-SecretText $_.Exception.Message))
  exit 1
} finally {
  if (Test-Path -LiteralPath $payloadPath) {
    Remove-Item -LiteralPath $payloadPath -Force
  }
}
