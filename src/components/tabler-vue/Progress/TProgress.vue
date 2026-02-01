<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  min?: number
  max?: number
  variant?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  indeterminate?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  min: 0,
  max: 100,
  variant: 'primary',
  size: 'md',
  indeterminate: false,
  label: '',
})

const percentage = computed(() => {
  return ((props.value - props.min) / (props.max - props.min)) * 100
})

const classes = computed(() => {
  return {
    'progress': true,
    [`progress-${props.size}`]: props.size !== 'md',
  }
})

const barClasses = computed(() => {
  return {
    'progress-bar': true,
    [`bg-${props.variant}`]: props.variant,
    'progress-bar-indeterminate': props.indeterminate,
  }
})
</script>

<template>
  <div :class="classes">
    <div
      :class="barClasses"
      :style="{ width: indeterminate ? '100%' : `${percentage}%` }"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-label="label || `${percentage}%`"
    >
      <span v-if="$slots.default || label" class="progress-bar-label">
        <slot>{{ label }}</slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TProgress'
}
</script>
