<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  level?: number
  bars?: number
  color?: string
  size?: string
  label?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  bars: 3,
  color: ''
})

const totalBars = computed(() => {
  return Math.max(2, Math.min(5, props.bars))
})

const classes = computed(() => {
  return {
    'signal': true,
    [`signal-${props.color}`]: !!props.color
  }
})

const styles = computed(() => {
  if (props.size) {
    return { '--tblr-signal-size': props.size }
  }
  return undefined
})

const computedAriaLabel = computed(() => {
  if (props.label || props.ariaLabel) return props.ariaLabel || props.label
  return `Level ${props.level} of ${totalBars.value}`
})
</script>

<template>
  <span v-if="label || $slots.default" class="d-inline-flex align-items-center gap-2">
    <span :class="classes" :style="styles" aria-hidden="true">
      <span
        v-for="i in totalBars"
        :key="i"
        class="signal-bar"
        :class="{ active: i <= level }"
      ></span>
    </span>
    <slot>{{ label }}</slot>
  </span>
  <span
    v-else
    :class="classes"
    :style="styles"
    role="img"
    :aria-label="computedAriaLabel"
  >
    <span
      v-for="i in totalBars"
      :key="i"
      class="signal-bar"
      :class="{ active: i <= level }"
    ></span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'TSignal'
}
</script>
