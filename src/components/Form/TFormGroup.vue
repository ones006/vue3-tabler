<script setup lang="ts">
interface Props {
  label?: string
  description?: string
  required?: boolean
  error?: string
  help?: string
  horizontal?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false,
  horizontal: false
})
</script>

<template>
  <div :class="['mb-3', horizontal ? 'row' : '']">
    <label v-if="label || $slots.label"
      :class="[horizontal ? 'col-3 col-form-label' : 'form-label', required ? 'required' : '']">
      <slot name="label">{{ label }}</slot>
      <span v-if="description" class="form-label-description">
        {{ description }}
      </span>
    </label>
    <div :class="[horizontal ? 'col' : '']">
      <slot />
      <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
      <div v-if="help" class="form-hint">
        <slot name="help">{{ help }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TFormGroup'
}
</script>
