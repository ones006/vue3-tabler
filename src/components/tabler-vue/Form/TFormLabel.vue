<script setup lang="ts">
interface Props {
  required?: boolean
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  description: '',
})
</script>

<template>
  <label class="form-label" :class="{ required: required }">
    <slot />
    <span v-if="description" class="form-label-description">
      {{ description }}
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: 'TFormLabel'
}
</script>
