<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  password?: string
  segments?: number
  minLength?: number
  messages?: string[]
  thresholds?: number[]
  customScore?: (pwd: string) => number
  emptyText?: string
  showText?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
  segments: 4,
  minLength: 8,
  messages: () => ['Weak', 'Fair', 'Good', 'Strong'],
  thresholds: () => [2, 4, 6],
  emptyText: '',
  showText: true,
  ariaLabel: 'Password strength'
})

const emit = defineEmits<{
  (e: 'change', payload: { score: number; level: number; message: string }): void
}>()

// Built-in Tabler scoring algorithm:
// 1 pt for reaching minLength
// 1 pt for 4 characters more
// 1 pt for 16 characters
// 1 pt for lowercase letter
// 1 pt for uppercase letter
// 1 pt for digit
// 1 pt for special character
// 1 pt for a second special character
const score = computed(() => {
  const pwd = props.password || ''
  if (!pwd) return 0

  if (props.customScore) {
    return props.customScore(pwd)
  }

  let pts = 0
  if (pwd.length >= props.minLength) pts++
  if (pwd.length >= props.minLength + 4) pts++
  if (pwd.length >= 16) pts++
  if (/[a-z]/.test(pwd)) pts++
  if (/[A-Z]/.test(pwd)) pts++
  if (/[0-9]/.test(pwd)) pts++
  if (/[^a-zA-Z0-9]/.test(pwd)) pts++
  if ((pwd.match(/[^a-zA-Z0-9]/g) || []).length >= 2) pts++

  return pts
})

// Determine level 0..4
const level = computed(() => {
  const s = score.value
  const t1 = props.thresholds[0] ?? 20
  const t2 = props.thresholds[1] ?? 40
  const t3 = props.thresholds[2] ?? 60
  if (!props.password) return 0
  if (s < t1) return 1
  if (s < t2) return 2
  if (s < t3) return 3
  return 4
})

const levelMessage = computed(() => {
  if (!props.password) return props.emptyText
  const idx = Math.max(0, Math.min(level.value - 1, props.messages.length - 1))
  return props.messages[idx] || ''
})

const segmentColors = computed(() => {
  const lvl = level.value
  const list: string[] = []

  let colorClass = ''
  if (lvl === 1) colorClass = 'bg-danger'
  else if (lvl === 2) colorClass = 'bg-warning'
  else if (lvl === 3) colorClass = 'bg-azure'
  else if (lvl === 4) colorClass = 'bg-success'

  const filledSegments = Math.round((lvl / 4) * props.segments)

  for (let i = 0; i < props.segments; i++) {
    list.push(i < filledSegments ? colorClass : '')
  }
  return list
})
</script>

<template>
  <div class="strength-wrapper">
    <div
      class="strength"
      data-bs-strength="true"
      :data-bs-min-length="minLength"
      :data-bs-thresholds="JSON.stringify(thresholds)"
      :aria-label="ariaLabel"
      role="progressbar"
      :aria-valuenow="level"
      aria-valuemin="0"
      aria-valuemax="4"
    >
      <span
        v-for="(color, idx) in segmentColors"
        :key="idx"
        class="strength-segment"
        :class="color"
      ></span>
    </div>
    <div v-if="showText" class="strength-text mt-1 text-secondary fs-5">
      <slot :level="level" :score="score" :message="levelMessage">
        {{ levelMessage }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.strength {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
  height: 0.25rem;
}

.strength-segment {
  flex: 1 1 0%;
  border-radius: var(--tblr-border-radius-pill, 100rem);
  background-color: var(--tblr-border-color, #e6e7e9);
  transition: background-color 0.2s ease;
}
</style>
