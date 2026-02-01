<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  rows?: number | string
  disabled?: boolean
  readonly?: boolean
  status?: 'valid' | 'invalid' | ''
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  rows: 3,
  disabled: false,
  readonly: false,
  status: '',
})

const emit = defineEmits(['update:modelValue', 'input'])

const classes = computed(() => {
  return {
    'form-control': true,
    'is-valid': props.status === 'valid',
    'is-invalid': props.status === 'invalid',
  }
})

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}
</script>

<template>
  <textarea
    :class="classes"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :readonly="readonly"
    @input="onInput"
  ></textarea>
</template>

<script lang="ts">
export default {
  name: 'TTextarea'
}
</script>
