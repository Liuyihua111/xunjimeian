from django.db import models


class Tag(models.Model):
    tag = models.CharField(max_length=64, unique=True)
    category = models.CharField(max_length=64)
    description = models.TextField()
    use_cases = models.TextField(blank=True)
    aliases = models.JSONField(default=list, blank=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.tag


class Source(models.Model):
    title = models.CharField(max_length=120)
    person = models.CharField(max_length=80, blank=True)
    topic = models.CharField(max_length=80, blank=True)
    period = models.CharField(max_length=80, blank=True)
    location = models.CharField(max_length=80, blank=True)
    content = models.TextField()
    source_name = models.CharField(max_length=160)
    source_url = models.URLField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    usable_for_qa = models.BooleanField(default=True)
    note = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Project(models.Model):
    year = models.PositiveIntegerField(unique=True)
    slug = models.SlugField(max_length=16, blank=True)
    title = models.CharField(max_length=160)
    subtitle = models.CharField(max_length=220, blank=True)
    summary = models.TextField()
    directions = models.JSONField(default=list, blank=True)
    cities = models.JSONField(default=list, blank=True)
    outputs = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    links = models.JSONField(default=list, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    detail_sections = models.JSONField(default=list, blank=True)
    inheritance_value = models.TextField(blank=True)
    reusable_assets = models.TextField(blank=True)

    class Meta:
        ordering = ["year"]

    def __str__(self):
        return f"{self.year} {self.title}"
