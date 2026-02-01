<script setup lang="ts">
import { inject, computed } from 'vue'

interface Props {
  value: any
  label?: string
  icon?: any
}

const props = defineProps<Props>()

const group = inject<any>('selectGroup')

const isChecked = computed(() => {
  if (group.multiple && Array.isArray(group.modelValue)) {
    return group.modelValue.includes(props.value)
  }
  return group.modelValue === props.value
})

const onChange = () => {
  group.onUpdate(props.value)
}
</script>

<template>
  <label class="form-selectgroup-item">
    <input :type="group.multiple ? 'checkbox' : 'radio'" :checked="isChecked" class="form-selectgroup-input"
      @change="onChange" />
    <span class="form-selectgroup-label">
      <component v-if="icon" :is="icon" class="icon me-2" />
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'TFormSelectGroupItem'
}
</script>
