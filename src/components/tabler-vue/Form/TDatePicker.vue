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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select a date',
  disabled: false,
  readonly: false,
  format: 'YYYY-MM-DD'
})

const emit = defineEmits(['update:modelValue', 'change'])

const innerValue = ref(props.modelValue)
const isLitepickerAvailable = ref(false)
// Use a stable ID
const componentId = props.id || `datepicker-${Math.random().toString(36).substring(2, 11)}`
let picker: any = null

watch(() => props.modelValue, (val) => {
  innerValue.value = val
  if (picker) {
    picker.setDate(val)
  }
})

const initPicker = () => {
  if ((window as any).Litepicker) {
    isLitepickerAvailable.value = true

    // We need to wait for the DOM to update 'type' change and ensures ID is present
    setTimeout(() => {
      const el = document.getElementById(componentId)
      if (!el) return

      if (picker) picker.destroy()

      picker = new (window as any).Litepicker({
        element: el,
        format: props.format,
        buttonText: {
          previousMonth: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M15 6l-6 6l6 6" /></svg>`,
          nextMonth: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 6l6 6l-6 6" /></svg>`,
        },
        setup: (picker: any) => {
          picker.on('selected', (date: any) => {
            const formatted = date.format(props.format)
            innerValue.value = formatted
            emit('update:modelValue', formatted)
            emit('change', formatted)
          })
        }
      })
    }, 200)
  } else {
    setTimeout(() => {
      if ((window as any).Litepicker && !picker) {
        initPicker()
      }
    }, 1000)
  }
}

onMounted(() => {
  isLitepickerAvailable.value = !!(window as any).Litepicker
  initPicker()
})

onUnmounted(() => {
  if (picker) {
    picker.destroy()
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
  <TInput :type="!isLitepickerAvailable ? 'date' : 'text'" :model-value="innerValue" :placeholder="placeholder"
    :disabled="disabled" :readonly="readonly" :id="componentId" :name="name" @update:model-value="onInput"
    @change="onChange">
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
