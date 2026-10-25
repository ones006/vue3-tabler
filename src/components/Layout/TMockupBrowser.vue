<script setup lang="ts">
interface Props {
  url?: string
  secure?: boolean
}

withDefaults(defineProps<Props>(), {
  url: '',
  secure: false
})
</script>

<template>
  <div class="mockup-browser">
    <div class="mockup-browser-toolbar">
      <span class="mockup-browser-controls"></span>
      <div v-if="url || $slots.url" class="mockup-browser-url">
        <svg
          v-if="secure"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
          <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
          <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
        </svg>
        <slot name="url">
          <span>{{ url }}</span>
        </slot>
      </div>
      <slot name="toolbar" />
    </div>
    <div class="mockup-browser-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TMockupBrowser'
}
</script>
