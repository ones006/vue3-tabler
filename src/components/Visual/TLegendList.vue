<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  vertical?: boolean
  divided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  divided: false
})

const classes = computed(() => {
  return {
    'legend-list': true,
    'legend-list-vertical': props.vertical,
    'legend-list-divided': props.divided
  }
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TLegendList'
}
</script>
