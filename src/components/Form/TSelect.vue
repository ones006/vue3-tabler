<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value?: any
  disabled?: boolean
  options?: Option[] // for optgroup
}

interface Props {
  modelValue?: any
  options?: Option[]
  placeholder?: string
  disabled?: boolean
  status?: 'valid' | 'invalid' | ''
  size?: 'sm' | 'md' | 'lg'
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  disabled: false,
  status: '',
  size: 'md',
  multiple: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const classes = computed(() => {
  return {
    'form-select': true,
    [`form-select-${props.size}`]: props.size !== 'md',
    'is-valid': props.status === 'valid',
    'is-invalid': props.status === 'invalid',
  }
})

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (props.multiple) {
    const values = Array.from(target.selectedOptions).map(opt => opt.value)
    emit('update:modelValue', values)
    emit('change', values)
  } else {
    emit('update:modelValue', target.value)
    emit('change', target.value)
  }
}
</script>

<template>
  <select :class="classes" :value="modelValue" :disabled="disabled" :multiple="multiple" @change="onChange">
    <option v-if="placeholder && !multiple" value="" disabled>{{ placeholder }}</option>
    <slot>
      <template v-for="(group, index) in options" :key="index">
        <optgroup v-if="group.options" :label="group.label">
          <option v-for="option in group.options" :key="option.value" :value="option.value" :disabled="option.disabled">
            {{ option.label }}
          </option>
        </optgroup>
        <option v-else :key="group.value" :value="group.value" :disabled="group.disabled">
          {{ group.label }}
        </option>
      </template>
    </slot>
  </select>
</template>

<script lang="ts">
export default {
  name: 'TSelect'
}
</script>
