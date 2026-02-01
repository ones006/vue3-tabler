<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean | any[]
  value?: any
  label?: string
  description?: string
  disabled?: boolean
  inline?: boolean
  toggle?: boolean // for switch
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  value: true,
  label: '',
  description: '',
  disabled: false,
  inline: false,
  toggle: false,
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === props.value
})

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    if (target.checked) {
      newValue.push(props.value)
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) newValue.splice(index, 1)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', target.checked ? props.value : (typeof props.modelValue === 'boolean' ? false : null))
  }
}
</script>

<template>
  <label
    class="form-check"
    :class="{ 'form-check-inline': inline, 'form-switch': toggle }"
  >
    <input
      type="checkbox"
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
  name: 'TCheckbox'
}
</script>
