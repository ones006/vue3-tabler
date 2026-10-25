<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export interface Props {
  to: number
  from?: number
  duration?: number // in seconds
  decimals?: number
  decimalSeparator?: string
  thousandsSeparator?: string
  useGrouping?: boolean
  useEasing?: boolean
  prefix?: string
  suffix?: string
  tag?: string
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  from: 0,
  duration: 2,
  decimals: 0,
  decimalSeparator: '.',
  thousandsSeparator: ',',
  useGrouping: true,
  useEasing: true,
  prefix: '',
  suffix: '',
  tag: 'span',
  autoStart: true
})

const rootEl = ref<HTMLElement | null>(null)
const currentValue = ref(props.from)
let animationFrameId: number | null = null
let observer: IntersectionObserver | null = null
let hasStarted = false

// Smooth easeOutExpo or easeOutQuad
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

const formatNumber = (num: number): string => {
  const fixed = num.toFixed(props.decimals)
  const parts = fixed.split('.')
  let integerPart = parts[0] || '0'
  const fractionPart = parts[1]

  if (props.useGrouping) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, props.thousandsSeparator)
  }

  let formatted = integerPart
  if (props.decimals > 0 && fractionPart !== undefined) {
    formatted += props.decimalSeparator + fractionPart
  }

  return `${props.prefix}${formatted}${props.suffix}`
}

const displayText = computed(() => formatNumber(currentValue.value))

const startAnimation = () => {
  if (hasStarted) return
  hasStarted = true

  const startVal = props.from
  const endVal = props.to
  const durationMs = props.duration * 1000
  let startTime: number | null = null

  const step = (now: number) => {
    if (!startTime) startTime = now
    const elapsed = now - startTime
    const progress = Math.min(elapsed / durationMs, 1)

    const factor = props.useEasing ? easeOutExpo(progress) : progress
    currentValue.value = startVal + (endVal - startVal) * factor

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step)
    } else {
      currentValue.value = endVal
    }
  }

  animationFrameId = requestAnimationFrame(step)
}

const reset = () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  currentValue.value = props.from
  hasStarted = false
}

const restart = () => {
  reset()
  startAnimation()
}

defineExpose({
  restart,
  reset,
  start: startAnimation
})

watch(() => props.to, () => {
  restart()
})

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined' && props.autoStart && rootEl.value) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        startAnimation()
        observer?.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(rootEl.value)
  } else if (props.autoStart) {
    startAnimation()
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (observer) observer.disconnect()
})
</script>

<template>
  <component
    :is="tag"
    ref="rootEl"
    class="countup"
    data-countup="true"
    :data-countup-duration="duration"
  >
    {{ displayText }}
  </component>
</template>
