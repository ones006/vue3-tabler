<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'

interface Props {
  modelValue?: number | string
  min?: number
  max?: number
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  width?: string
  type?: 'text' | 'number'
  isValid?: boolean
  isInvalid?: boolean
  name?: string
  id?: string
  repeat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  step: 1,
  size: 'md',
  disabled: false,
  readonly: false,
  type: 'text',
  repeat: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const currentValue = ref<number>(
  props.modelValue !== undefined && props.modelValue !== ''
    ? Number(props.modelValue)
    : props.min !== undefined
      ? props.min
      : 0
)

watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== '') {
    currentValue.value = Number(val)
  }
})

// Calculate decimal places based on step
const precision = computed(() => {
  const stepStr = props.step.toString()
  const parts = stepStr.split('.')
  if (parts[1]) {
    return parts[1].length
  }
  return 0
})

const isAtMin = computed(() => {
  return props.min !== undefined && currentValue.value <= props.min
})

const isAtMax = computed(() => {
  return props.max !== undefined && currentValue.value >= props.max
})

const clamp = (val: number): number => {
  let res = val
  if (props.min !== undefined && res < props.min) res = props.min
  if (props.max !== undefined && res > props.max) res = props.max
  // Round to precision
  const factor = Math.pow(10, precision.value)
  return Math.round(res * factor) / factor
}

const displayValue = computed(() => {
  if (precision.value > 0) {
    return currentValue.value.toFixed(precision.value)
  }
  return currentValue.value.toString()
})

const updateValue = (newVal: number) => {
  const clamped = clamp(newVal)
  currentValue.value = clamped
  emit('update:modelValue', clamped)
  emit('change', clamped)
}

const increment = () => {
  if (props.disabled || props.readonly || isAtMax.value) return
  updateValue(currentValue.value + props.step)
}

const decrement = () => {
  if (props.disabled || props.readonly || isAtMin.value) return
  updateValue(currentValue.value - props.step)
}

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const raw = target.value.trim()
  if (raw === '' || raw === '-') return
  const num = Number(raw)
  if (!isNaN(num)) {
    currentValue.value = num
    emit('update:modelValue', num)
  }
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const raw = target.value.trim()
  const num = Number(raw)
  if (isNaN(num)) {
    updateValue(props.min !== undefined ? props.min : 0)
  } else {
    updateValue(num)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    increment()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    decrement()
  } else if (e.key === 'Home' && props.min !== undefined) {
    e.preventDefault()
    updateValue(props.min)
  } else if (e.key === 'End' && props.max !== undefined) {
    e.preventDefault()
    updateValue(props.max)
  }
}

// Hold to repeat support
let repeatTimer: any = null
let repeatDelay: any = null

const startRepeat = (action: () => void) => {
  if (!props.repeat || props.disabled || props.readonly) return
  action()
  repeatDelay = setTimeout(() => {
    repeatTimer = setInterval(() => {
      action()
    }, 100)
  }, 400)
}

const stopRepeat = () => {
  if (repeatDelay) clearTimeout(repeatDelay)
  if (repeatTimer) clearInterval(repeatTimer)
}

onUnmounted(() => {
  stopRepeat()
})

const containerClasses = computed(() => {
  return {
    'number-input': true,
    [`number-input-${props.size}`]: props.size !== 'md'
  }
})

const inputClasses = computed(() => {
  return {
    'form-control': true,
    [`form-control-${props.size}`]: props.size !== 'md',
    'is-valid': props.isValid,
    'is-invalid': props.isInvalid
  }
})

const containerStyle = computed(() => {
  if (props.width) {
    return { '--tblr-number-input-input-width': props.width }
  }
  return undefined
})
</script>

<template>
  <div :class="containerClasses" :style="containerStyle" data-bs-toggle="number-input">
    <button
      type="button"
      class="btn btn-icon"
      data-bs-number-input-action="decrement"
      aria-label="Decrease"
      :disabled="disabled || readonly || isAtMin"
      @mousedown="startRepeat(decrement)"
      @mouseup="stopRepeat"
      @mouseleave="stopRepeat"
      @click="!repeat && decrement()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12l14 0" /></svg>
    </button>
    <input
      :id="id"
      :name="name"
      :type="type"
      :class="inputClasses"
      :value="displayValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      role="spinbutton"
      inputmode="numeric"
      :aria-valuenow="currentValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
      @input="handleInput"
      @change="handleChange"
      @keydown="handleKeyDown"
    />
    <button
      type="button"
      class="btn btn-icon"
      data-bs-number-input-action="increment"
      aria-label="Increase"
      :disabled="disabled || readonly || isAtMax"
      @mousedown="startRepeat(increment)"
      @mouseup="stopRepeat"
      @mouseleave="stopRepeat"
      @click="!repeat && increment()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TNumberInput'
}
</script>
