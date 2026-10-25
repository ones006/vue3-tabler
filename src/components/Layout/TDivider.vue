<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  position?: 'start' | 'center' | 'end'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  color: ''
})

const hasText = computed(() => {
  return !!props.text
})

const classes = computed(() => {
  return {
    'hr-text': true,
    'hr-text-start': props.position === 'start',
    'hr-text-end': props.position === 'end',
    [`text-${props.color}`]: !!props.color
  }
})
</script>

<template>
  <div v-if="hasText || $slots.default" :class="classes">
    <slot>{{ text }}</slot>
  </div>
  <hr v-else :class="[color ? `text-${color}` : '']" />
</template>

<script lang="ts">
export default {
  name: 'TDivider'
}
</script>
