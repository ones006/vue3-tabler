<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  inline?: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  inline: false,
  color: ''
})

const style = computed(() => {
  if (props.color) {
    const isVar = props.color.startsWith('--') || props.color.startsWith('var(')
    const val = isVar ? (props.color.startsWith('var(') ? props.color : `var(${props.color})`) : `var(--tblr-${props.color})`
    return { '--tblr-list-icon-color': val }
  }
  return undefined
})
</script>

<template>
  <ul class="list-icon" :class="{ 'list-icon-inline': inline }" :style="style">
    <slot />
  </ul>
</template>

<script lang="ts">
export default {
  name: 'TIconList'
}
</script>
