<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: string
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: '',
  circle: false
})

const classes = computed(() => {
  return {
    'shape': true,
    [`shape-${props.size}`]: props.size !== 'md',
    [`shape-${props.color}`]: !!props.color,
    'shape-circle': props.circle
  }
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script lang="ts">
export default {
  name: 'TShape'
}
</script>
