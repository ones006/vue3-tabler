<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  tag?: string
  flush?: boolean
  transparent?: boolean
  hover?: boolean
  bordered?: boolean
  selectable?: boolean
  size?: 'sm' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  flush: false,
  transparent: false,
  hover: false,
  bordered: false,
  selectable: false
})

const classes = computed(() => {
  return {
    'list-group': true,
    'list-group-flush': props.flush,
    'list-group-transparent': props.transparent,
    'list-group-hover': props.hover,
    'list-group-bordered': props.bordered,
    'list-group-selectable': props.selectable,
    [`list-group-${props.size}`]: !!props.size
  }
})
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  name: 'TListGroup'
}
</script>
