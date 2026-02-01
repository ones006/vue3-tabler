<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<template>
  <fieldset class="form-fieldset">
    <legend v-if="title || $slots.title" class="form-fieldset-title">
      <slot name="title">{{ title }}</slot>
    </legend>
    <slot />
  </fieldset>
</template>

<script lang="ts">
export default {
  name: 'TFormFieldset'
}
</script>
