<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: string
  top?: boolean
  bookmark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  top: false,
  bookmark: false,
})

const classes = computed(() => {
  return {
    'ribbon': true,
    [`bg-${props.variant}`]: true,
    'ribbon-top': props.top,
    'ribbon-bookmark': props.bookmark,
  }
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TRibbon'
}
</script>
