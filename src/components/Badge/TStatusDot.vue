<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  animated: false
})

const classes = computed(() => {
  return {
    'status-dot': true,
    'status-dot-animated': props.animated,
    [`status-${props.color}`]: !!props.color
  }
})
</script>

<template>
  <span :class="classes"></span>
</template>

<script lang="ts">
export default {
  name: 'TStatusDot'
}
</script>
