<script setup lang="ts">
interface ColorOption {
  value: string
  color: string // class like 'bg-blue' or hex
}

interface Props {
  modelValue?: string
  options?: ColorOption[]
  name?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [
    { value: 'blue', color: 'bg-blue' },
    { value: 'azure', color: 'bg-azure' },
    { value: 'indigo', color: 'bg-indigo' },
    { value: 'purple', color: 'bg-purple' },
    { value: 'pink', color: 'bg-pink' },
    { value: 'red', color: 'bg-red' },
    { value: 'orange', color: 'bg-orange' },
    { value: 'yellow', color: 'bg-yellow' },
    { value: 'lime', color: 'bg-lime' },
    { value: 'green', color: 'bg-green' },
    { value: 'teal', color: 'bg-teal' },
    { value: 'cyan', color: 'bg-cyan' }
  ],
  multiple: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const onChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="row g-2">
    <div v-for="option in options" :key="option.value" class="col-auto">
      <label class="form-colorinput">
        <input :name="name" :type="multiple ? 'checkbox' : 'radio'" :value="option.value"
          :checked="modelValue === option.value" class="form-colorinput-input" @change="onChange(option.value)" />
        <span class="form-colorinput-color" :class="option.color.startsWith('bg-') ? option.color : ''"
          :style="!option.color.startsWith('bg-') ? { backgroundColor: option.color } : {}"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TColorInput'
}
</script>
