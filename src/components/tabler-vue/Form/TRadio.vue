<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: any
  value?: any
  label?: string
  description?: string
  disabled?: boolean
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  value: null,
  label: '',
  description: '',
  disabled: false,
  inline: false,
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue === props.value)

const onChange = () => {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label class="form-check" :class="{ 'form-check-inline': inline }">
    <input
      type="radio"
      class="form-check-input"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
    />
    <span v-if="label || $slots.default" class="form-check-label">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="description" class="form-check-description">
      {{ description }}
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'TRadio'
}
</script>
