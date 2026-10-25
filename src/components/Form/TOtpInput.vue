<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

export type OtpType = 'numeric' | 'alphanumeric' | 'alpha'

export interface Props {
  modelValue?: string
  length?: number
  type?: OtpType
  mask?: boolean
  maskChar?: string
  connected?: boolean
  groups?: number[]
  separator?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  isValid?: boolean
  isInvalid?: boolean
  ariaLabel?: string
  name?: string
  id?: string
  autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  length: 6,
  type: 'numeric',
  mask: false,
  maskChar: '•',
  connected: false,
  groups: () => [],
  separator: '·',
  size: 'md',
  disabled: false,
  readonly: false,
  isValid: false,
  isInvalid: false,
  ariaLabel: 'Verification code',
  autoFocus: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'complete', val: string): void
  (e: 'change', val: string): void
}>()

const inputEl = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue || '')
const focusedIndex = ref(0)
const isFocused = ref(false)

watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value) {
    internalValue.value = val || ''
  }
})

// Calculate characters per slot
const slots = computed(() => {
  const chars = internalValue.value.split('')
  const res: { char: string; index: number; isFilled: boolean; isGroupEnd: boolean }[] = []
  
  // Calculate group break positions
  let accum = 0
  const groupEndIndices = new Set<number>()
  if (props.groups && props.groups.length > 0) {
    for (let i = 0; i < props.groups.length - 1; i++) {
      const g = props.groups[i]
      if (g !== undefined) {
        accum += g
        groupEndIndices.add(accum - 1)
      }
    }
  }

  for (let i = 0; i < props.length; i++) {
    const rawChar = chars[i] || ''
    const displayChar = rawChar ? (props.mask ? props.maskChar : rawChar) : ''
    res.push({
      char: displayChar,
      index: i,
      isFilled: !!rawChar,
      isGroupEnd: groupEndIndices.has(i)
    })
  }
  return res
})

const sanitizeInput = (val: string): string => {
  let cleaned = val
  if (props.type === 'numeric') {
    cleaned = cleaned.replace(/\D/g, '')
  } else if (props.type === 'alpha') {
    cleaned = cleaned.replace(/[^a-zA-Z]/g, '')
  } else if (props.type === 'alphanumeric') {
    cleaned = cleaned.replace(/[^a-zA-Z0-9]/g, '')
  }
  return cleaned.slice(0, props.length)
}

const updateValue = (newVal: string) => {
  const sanitized = sanitizeInput(newVal)
  internalValue.value = sanitized
  emit('update:modelValue', sanitized)
  emit('change', sanitized)

  if (sanitized.length === props.length) {
    emit('complete', sanitized)
  }
}

const onNativeInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  updateValue(target.value)
}

const onSlotClick = (index: number) => {
  if (props.disabled || props.readonly) return
  focusedIndex.value = Math.min(index, internalValue.value.length)
  inputEl.value?.focus()
  // Set caret position at focusedIndex
  if (inputEl.value) {
    const pos = focusedIndex.value
    inputEl.value.setSelectionRange(pos, pos + 1)
  }
}

const onFocus = () => {
  isFocused.value = true
  focusedIndex.value = Math.min(internalValue.value.length, props.length - 1)
}

const onBlur = () => {
  isFocused.value = false
}

const onKeyDown = (e: KeyboardEvent) => {
  if (props.disabled || props.readonly) return

  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (focusedIndex.value > 0) {
      focusedIndex.value--
    }
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    if (focusedIndex.value < props.length - 1) {
      focusedIndex.value++
    }
  } else if (e.key === 'Backspace') {
    if (internalValue.value.length > 0) {
      const chars = internalValue.value.split('')
      if (focusedIndex.value < chars.length) {
        chars.splice(focusedIndex.value, 1)
        updateValue(chars.join(''))
      } else {
        chars.pop()
        updateValue(chars.join(''))
        focusedIndex.value = Math.max(0, chars.length)
      }
    }
  }
}

onMounted(() => {
  if (props.autoFocus && inputEl.value) {
    inputEl.value.focus()
  }
})

const rootClasses = computed(() => [
  'otp',
  props.connected && 'otp-connected',
  props.size === 'sm' && 'otp-sm',
  props.size === 'lg' && 'otp-lg',
  props.isValid && 'is-valid',
  props.isInvalid && 'is-invalid'
])
</script>

<template>
  <div
    ref="rootEl"
    :class="rootClasses"
    data-bs-toggle="otp"
    :data-bs-length="length"
    :data-bs-type="type"
    :data-bs-mask="mask ? 'true' : undefined"
    :data-bs-groups="groups.length ? JSON.stringify(groups) : undefined"
    :data-bs-separator="separator !== '·' ? separator : undefined"
  >
    <!-- Screen reader / native input overlay -->
    <input
      ref="inputEl"
      type="text"
      class="otp-input visually-hidden-accessible"
      :value="internalValue"
      :maxlength="length"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      :id="id"
      :aria-label="ariaLabel"
      autocomplete="one-time-code"
      inputmode="numeric"
      @input="onNativeInput"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
    />

    <!-- Rendered Slots -->
    <template v-for="slot in slots" :key="slot.index">
      <div
        class="otp-slot"
        :class="{
          'active': isFocused && (focusedIndex === slot.index || (internalValue.length === slot.index && focusedIndex >= internalValue.length)),
          'filled': slot.isFilled
        }"
        aria-hidden="true"
        @click="onSlotClick(slot.index)"
      >
        {{ slot.char }}
      </div>
      <div
        v-if="slot.isGroupEnd"
        class="otp-separator"
        aria-hidden="true"
      >
        {{ separator }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.otp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  user-select: none;
}

.otp-connected {
  gap: 0;
}

.otp-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: var(--tblr-border-width, 1px) solid var(--tblr-border-color, #dce1e7);
  border-radius: var(--tblr-border-radius, 4px);
  background: var(--tblr-bg-forms, #fff);
  color: var(--tblr-body-color, #182433);
  cursor: text;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.otp-connected .otp-slot {
  border-radius: 0;
}
.otp-connected .otp-slot:first-child {
  border-top-left-radius: var(--tblr-border-radius, 4px);
  border-bottom-left-radius: var(--tblr-border-radius, 4px);
}
.otp-connected .otp-slot:last-child {
  border-top-right-radius: var(--tblr-border-radius, 4px);
  border-bottom-right-radius: var(--tblr-border-radius, 4px);
}
.otp-connected .otp-slot + .otp-slot {
  margin-left: -1px;
}

.otp-slot.active {
  border-color: var(--tblr-primary, #066fd1);
  box-shadow: 0 0 0 0.25rem rgba(6, 111, 209, 0.25);
  z-index: 2;
}

.otp-sm .otp-slot {
  width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
}

.otp-lg .otp-slot {
  width: 3.25rem;
  height: 3.25rem;
  font-size: 1.5rem;
}

.otp-separator {
  padding: 0 0.25rem;
  font-weight: 700;
  color: var(--tblr-secondary-color, #667382);
}

.otp.is-invalid .otp-slot {
  border-color: var(--tblr-danger, #d63939);
}

.otp.is-valid .otp-slot {
  border-color: var(--tblr-success, #2fb344);
}

.visually-hidden-accessible {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 1px;
}
</style>
