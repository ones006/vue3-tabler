<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import TInput from './TInput.vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  id?: string
  name?: string
  format?: string
  dateFormat?: string
  weekNumbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select a date',
  disabled: false,
  readonly: false,
  format: 'YYYY-MM-DD',
  dateFormat: '',
  weekNumbers: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const innerValue = ref(props.modelValue)
const isPickerAvailable = ref(false)
const componentId = props.id || `datepicker-${Math.random().toString(36).substring(2, 11)}`
let picker: any = null

watch(() => props.modelValue, (val) => {
  innerValue.value = val
  if (picker) {
    if (typeof picker.setSelectedDates === 'function') {
      picker.setSelectedDates(val ? [val] : [])
    } else if (typeof picker.setDate === 'function') {
      picker.setDate(val)
    }
  }
})

const initPicker = () => {
  const el = document.getElementById(componentId)
  if (!el) return

  const tabler = (window as any).tabler
  const VanillaCalendarPro = (window as any).VanillaCalendarPro
  const Litepicker = (window as any).Litepicker

  // 1. Tabler native Datepicker (Tabler 1.6+)
  if (tabler && tabler.Datepicker && VanillaCalendarPro) {
    isPickerAvailable.value = true
    try {
      if (picker && typeof picker.dispose === 'function') {
        picker.dispose()
      }
      picker = tabler.Datepicker.getOrCreateInstance(el, {
        dateFormat: props.dateFormat || props.format || 'iso',
        weekNumbers: props.weekNumbers
      })
      el.addEventListener('change', (e: any) => {
        const val = e.target.value
        innerValue.value = val
        emit('update:modelValue', val)
        emit('change', val)
      })
      return
    } catch (e) {
      console.warn('Tabler Datepicker initialization failed, falling back', e)
    }
  }

  // 2. Legacy Litepicker (if loaded)
  if (Litepicker) {
    isPickerAvailable.value = true
    setTimeout(() => {
      if (!document.getElementById(componentId)) return
      if (picker && typeof picker.destroy === 'function') picker.destroy()

      picker = new Litepicker({
        element: el,
        format: props.format,
        setup: (p: any) => {
          p.on('selected', (date: any) => {
            const formatted = date.format(props.format)
            innerValue.value = formatted
            emit('update:modelValue', formatted)
            emit('change', formatted)
          })
        }
      })
    }, 100)
    return
  }

  // Otherwise, retry briefly if script is loading async
  setTimeout(() => {
    const hasTablerPicker = (window as any).tabler?.Datepicker && (window as any).VanillaCalendarPro
    const hasLite = (window as any).Litepicker
    if ((hasTablerPicker || hasLite) && !picker) {
      initPicker()
    }
  }, 500)
}

onMounted(() => {
  const tabler = (window as any).tabler
  const VanillaCalendarPro = (window as any).VanillaCalendarPro
  const Litepicker = (window as any).Litepicker
  isPickerAvailable.value = !!((tabler?.Datepicker && VanillaCalendarPro) || Litepicker)
  initPicker()
})

onUnmounted(() => {
  if (picker) {
    if (typeof picker.dispose === 'function') {
      picker.dispose()
    } else if (typeof picker.destroy === 'function') {
      picker.destroy()
    }
  }
})

const onInput = (val: any) => {
  innerValue.value = String(val)
  emit('update:modelValue', String(val))
}

const onChange = (val: any) => {
  emit('change', String(val))
}
</script>

<template>
  <TInput
    :type="isPickerAvailable ? 'text' : 'date'"
    :model-value="innerValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :id="componentId"
    :name="name"
    data-bs-toggle="datepicker"
    @update:model-value="onInput"
    @change="onChange"
  >
    <template #iconRight>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M4 11h16" />
        <path d="M11 15h1" />
        <path d="M12 15v3" />
      </svg>
    </template>
  </TInput>
</template>

<script lang="ts">
export default {
  name: 'TDatePicker'
}
</script>
