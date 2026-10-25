<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  value: number | string
  direction?: 'up' | 'down' | 'neutral' | 'auto'
  unit?: string
  invert?: boolean // e.g. for error rates, lower is better
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'auto',
  unit: '',
  invert: false,
  size: 'sm'
})

const resolvedDirection = computed(() => {
  if (props.direction !== 'auto') return props.direction

  const num = typeof props.value === 'number' ? props.value : parseFloat(String(props.value).replace(/[^0-9.-]/g, ''))
  if (isNaN(num) || num === 0) return 'neutral'
  return num > 0 ? 'up' : 'down'
})

const colorClass = computed(() => {
  const dir = resolvedDirection.value
  if (dir === 'neutral') return 'text-secondary'

  const isPositive = dir === 'up'
  const isGood = props.invert ? !isPositive : isPositive

  return isGood ? 'text-green' : 'text-red'
})

const formattedValue = computed(() => {
  const str = String(props.value)
  return `${str}${props.unit}`
})
</script>

<template>
  <span :class="[colorClass, 'd-inline-flex align-items-center lh-1']">
    <span>{{ formattedValue }}</span>

    <!-- Up Arrow -->
    <svg
      v-if="resolvedDirection === 'up'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['icon ms-1', size === 'sm' ? 'icon-sm' : '']"
      aria-hidden="true"
    >
      <path d="M12 5l0 14" />
      <path d="M18 11l-6 -6" />
      <path d="M6 11l6 -6" />
    </svg>

    <!-- Down Arrow -->
    <svg
      v-else-if="resolvedDirection === 'down'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['icon ms-1', size === 'sm' ? 'icon-sm' : '']"
      aria-hidden="true"
    >
      <path d="M12 5l0 14" />
      <path d="M18 13l-6 6" />
      <path d="M6 13l6 6" />
    </svg>

    <!-- Neutral Minus -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['icon ms-1', size === 'sm' ? 'icon-sm' : '']"
      aria-hidden="true"
    >
      <path d="M5 12l14 0" />
    </svg>
  </span>
</template>
