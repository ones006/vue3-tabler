<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  dot?: boolean
  animated?: boolean
  lite?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  dot: false,
  animated: false,
  lite: false,
  label: ''
})

const classes = computed(() => {
  return {
    'status': true,
    [`status-${props.color}`]: !!props.color,
    'status-lite': props.lite
  }
})

const dotClasses = computed(() => {
  return {
    'status-dot': true,
    'status-dot-animated': props.animated
  }
})
</script>

<template>
  <span :class="classes">
    <span v-if="dot" :class="dotClasses"></span>
    <slot>{{ label }}</slot>
  </span>
</template>

<script lang="ts">
export default {
  name: 'TStatus'
}
</script>
