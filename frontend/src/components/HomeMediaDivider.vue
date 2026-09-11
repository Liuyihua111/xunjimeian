<template>
  <div :class="['home-media-divider', `is-${variant}`]" aria-hidden="true">
    <svg viewBox="0 0 1200 140" preserveAspectRatio="xMidYMid meet">
      <template v-if="variant === 'gallery-documentary'">
        <g class="home-media-divider-grid">
          <path pathLength="1" d="M24 114 H326 M48 28 V122 M112 28 V122 M176 28 V122 M240 28 V122 M304 28 V122" />
        </g>
        <g class="home-media-divider-building">
          <path pathLength="1" d="M34 91 H61 V69 H286 V91 H320" />
          <path pathLength="1" d="M53 91 V112 H300 V91" />
          <path pathLength="1" d="M80 112 V83 H111 V112 M132 112 V83 H163 V112 M184 112 V83 H215 V112 M240 112 V77 H281 V112" />
          <path pathLength="1" d="M42 96 H312" />
        </g>
        <path class="home-media-divider-flow" pathLength="1" d="M320 91 C420 91 451 51 548 65 C633 77 684 98 770 75 C816 63 846 62 886 65" />
        <g class="home-media-divider-nodes">
          <circle cx="416" cy="79" r="4" />
          <circle cx="548" cy="65" r="5" />
          <circle cx="682" cy="91" r="3.5" />
          <circle cx="802" cy="69" r="4" />
        </g>
        <g class="home-media-divider-vhs">
          <path class="home-media-divider-vhs-shell" pathLength="1" d="M892 35 H1164 L1170 41 V102 L1164 108 H892 L886 102 V41 Z" />
          <path class="home-media-divider-vhs-window" pathLength="1" d="M918 48 H1138 L1150 88 H906 Z" />
          <path class="home-media-divider-vhs-reels" pathLength="1" d="M966 68 m-17 0 a17 17 0 1 0 34 0 a17 17 0 1 0-34 0 M966 68 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0-12 0 M1090 68 m-17 0 a17 17 0 1 0 34 0 a17 17 0 1 0-34 0 M1090 68 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0-12 0" />
          <path class="home-media-divider-tape" pathLength="1" d="M886 65 C900 65 907 73 918 82 C952 96 1104 96 1138 82" />
          <path class="home-media-divider-vhs-label" pathLength="1" d="M978 92 H1078 V101 H978 Z" />
        </g>
      </template>

      <template v-else>
        <g class="home-media-divider-vhs">
          <path class="home-media-divider-vhs-shell" pathLength="1" d="M34 36 H294 L300 42 V100 L294 106 H34 L28 100 V42 Z" />
          <path class="home-media-divider-vhs-window" pathLength="1" d="M54 49 H274 L286 87 H42 Z" />
          <path class="home-media-divider-vhs-reels" pathLength="1" d="M99 68 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0-32 0 M99 68 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0-12 0 M223 68 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0-32 0 M223 68 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0-12 0" />
          <path class="home-media-divider-tape" pathLength="1" d="M83 82 C116 96 238 96 272 82 C283 75 289 71 300 71" />
          <path class="home-media-divider-vhs-label" pathLength="1" d="M112 91 H212 V100 H112 Z" />
        </g>
        <path class="home-media-divider-flow" pathLength="1" d="M300 71 C412 71 458 96 564 73 C664 51 733 62 822 71" />
        <g class="home-media-divider-nodes">
          <circle cx="414" cy="80" r="4" />
          <circle cx="564" cy="73" r="5" />
          <circle cx="700" cy="59" r="3.5" />
          <circle cx="790" cy="68" r="4" />
        </g>
        <g class="home-media-divider-sound">
          <path class="home-media-divider-staff" pathLength="1" d="M822 48 H1172 M822 60 H1172 M822 72 H1172 M822 84 H1172 M822 96 H1172" />
          <path class="home-media-divider-note-stem" pathLength="1" d="M860 84 V55 M910 72 V43 M960 60 V34 M1024 84 V53 M1081 72 V42 M1138 60 V33 M910 43 Q936 48 960 34 M1081 42 Q1110 47 1138 33" />
          <path class="home-media-divider-note-stem" pathLength="1" d="M860 55 Q872 57 878 64 M1024 53 Q1036 55 1042 62" />
          <circle cx="860" cy="84" r="5" />
          <circle cx="910" cy="72" r="5" />
          <circle cx="960" cy="60" r="5" />
          <circle cx="1024" cy="84" r="5" />
          <circle cx="1081" cy="72" r="5" />
          <circle cx="1138" cy="60" r="5" />
        </g>
      </template>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    required: true,
    validator: (value) => ["gallery-documentary", "documentary-song"].includes(value)
  }
});
</script>
