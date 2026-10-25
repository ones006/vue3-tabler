<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: ''
})

const classes = computed(() => {
  return {
    'legend-dot': true,
    [`legend-${props.color}`]: !!props.color
  }
})
</script>

<template>
  <span :class="classes"></span>
</template>

<script lang="ts">
export default {
  name: 'TLegendDot'
}
</script>
