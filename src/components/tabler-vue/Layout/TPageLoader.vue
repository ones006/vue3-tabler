<script setup lang="ts">
interface Props {
  logo?: string
  logoHeight?: number | string
  text?: string
  fullPage?: boolean
  variant?: string
  indeterminate?: boolean
  progress?: number
}

withDefaults(defineProps<Props>(), {
  logoHeight: 36,
  text: 'Preparing application',
  fullPage: true,
  variant: 'primary',
  indeterminate: true,
  progress: 0
})
</script>

<template>
  <div :class="['page-loader', fullPage ? 'page page-center' : 'py-5']">
    <div :class="[fullPage ? 'container container-slim py-4' : 'w-100']">
      <div class="text-center">
        <div v-if="logo || $slots.logo" class="mb-3">
          <slot name="logo">
            <img :src="logo" :height="logoHeight" alt="Logo" class="navbar-brand-image" />
          </slot>
        </div>
        <div v-if="text || $slots.text" class="text-secondary mb-3">
          <slot name="text">{{ text }}</slot>
        </div>
        <div class="progress progress-sm">
          <div :class="[
            'progress-bar',
            `bg-${variant}`,
            indeterminate ? 'progress-bar-indeterminate' : ''
          ]" :style="!indeterminate ? { width: `${progress}%` } : {}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPageLoader'
}
</script>

<style scoped>
.page-loader.page-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
