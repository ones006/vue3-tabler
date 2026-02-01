<script setup lang="ts">
interface Props {
  id?: string
  flush?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: () => `accordion-${Math.random().toString(36).slice(2, 9)}`,
  flush: false,
})

provide('accordion-id', props.id)
</script>

<template>
  <div :id="id" class="accordion" :class="{ 'accordion-flush': flush }">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide } from 'vue'
export default {
  name: 'TAccordion'
}
</script>
