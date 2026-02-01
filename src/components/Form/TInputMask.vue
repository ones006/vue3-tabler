<script setup lang="ts">
import { ref, watch } from 'vue'
import TInput from './TInput.vue'

interface Props {
  modelValue?: string
  mask: string // e.g. '00/00/0000' or '(00) 0000-0000'
  placeholder?: string
  disabled?: boolean
  status?: 'valid' | 'invalid' | ''
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue', 'change'])

const innerValue = ref(props.modelValue)

const applyMask = (value: string, mask: string) => {
  let i = 0
  let v = 0
  let out = ''
  const val = value.replace(/\D/g, '') // Remove non-digits for numeric mask

  while (i < mask.length && v < val.length) {
    if (mask[i] === '0') {
      out += val[v++]
    } else {
      out += mask[i]
    }
    i++
  }
  return out
}

const onInput = (val: string | number) => {
  const masked = applyMask(String(val), props.mask)
  innerValue.value = masked
  emit('update:modelValue', masked)
}

watch(() => props.modelValue, (newVal) => {
  innerValue.value = newVal
})
</script>

<template>
  <TInput :model-value="innerValue" :placeholder="placeholder || mask" :disabled="disabled" :status="status"
    @update:model-value="onInput" />
</template>

<script lang="ts">
export default {
  name: 'TInputMask'
}
</script>
