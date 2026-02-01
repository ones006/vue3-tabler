<script setup lang="ts">
interface Props {
  modelValue?: any | any[]
  multiple?: boolean
  pills?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  pills: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const onUpdate = (value: any) => {
  if (props.multiple) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(value)
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(value)
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide('selectGroup', {
  modelValue: props.modelValue,
  multiple: props.multiple,
  onUpdate
})
</script>

<script lang="ts">
import { provide } from 'vue'

export default {
  name: 'TFormSelectGroup'
}
</script>

<template>
  <div :class="['form-selectgroup', pills ? 'form-selectgroup-pills' : '']">
    <slot />
  </div>
</template>
