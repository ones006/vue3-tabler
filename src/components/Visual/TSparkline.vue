<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  values?: (number | string)[] | string
  type?: 'line' | 'bar' | 'tristate' | 'circle'
  color?: string
  size?: 'sm' | 'lg'
  square?: boolean
  fill?: boolean | string
  spot?: 'last' | 'min' | 'max'
  barGap?: number
  barRadius?: number
  threshold?: number
  min?: number
  max?: number
  label?: string
  width?: string
  height?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  values: () => [],
  type: 'line',
  color: 'primary',
  square: false
})

const formattedValues = computed(() => {
  if (Array.isArray(props.values)) {
    return props.values.join(',')
  }
  return String(props.values || '')
})

const classes = computed(() => {
  return {
    'sparkline': true,
    [`text-${props.color}`]: !!props.color,
    [`sparkline-${props.size}`]: !!props.size,
    'sparkline-square': props.square
  }
})

const styles = computed(() => {
  const styleObj: Record<string, string> = {}
  if (props.width) {
    styleObj['--tblr-sparkline-width'] = props.width
  }
  if (props.height) {
    styleObj['--tblr-sparkline-height'] = props.height
  }
  return styleObj
})

const fillAttr = computed(() => {
  if (props.fill === true) return 'auto'
  if (typeof props.fill === 'string') return props.fill
  return undefined
})
</script>

<template>
  <span
    :class="classes"
    :style="styles"
    data-bs-toggle="sparkline"
    :data-bs-type="type !== 'line' ? type : undefined"
    :data-bs-values="formattedValues"
    :data-bs-fill="fillAttr"
    :data-bs-spot="spot"
    :data-bs-bar-gap="barGap"
    :data-bs-bar-radius="barRadius"
    :data-bs-threshold="threshold"
    :data-bs-min="min"
    :data-bs-max="max"
    :data-bs-label="label"
    :aria-label="ariaLabel || 'Trend'"
  ></span>
</template>

<script lang="ts">
export default {
  name: 'TSparkline'
}
</script>
