<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  loader?: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  loader: false,
  color: ''
})

const classes = computed(() => {
  return {
    'text-shimmer': true,
    [`text-${props.color}`]: !!props.color
  }
})
</script>

<template>
  <span :class="classes" role="status">
    <span v-if="loader" class="text-shimmer-loader" aria-hidden="true"></span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script lang="ts">
export default {
  name: 'TTextShimmer'
}
</script>
