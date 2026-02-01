<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: number | string
  min?: number | string
  max?: number | string
  step?: number | string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits(['update:modelValue', 'change'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}
</script>

<template>
  <input type="range" class="form-range" :value="modelValue" :min="min" :max="max" :step="step" :disabled="disabled"
    @input="onInput" @change="onChange" />
</template>

<script lang="ts">
export default {
  name: 'TRange'
}
</script>
