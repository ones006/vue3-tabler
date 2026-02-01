<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  gutter?: number | string
  gutterX?: number | string
  gutterY?: number | string
  alignItems?: string
  justifyContent?: string
}

const props = defineProps<Props>()

const styles = computed(() => {
  const s: any = {}
  if (props.gutterX || props.gutter) s['--bs-gutter-x'] = props.gutterX || props.gutter
  if (props.gutterY || props.gutter) s['--bs-gutter-y'] = props.gutterY || props.gutter
  return s
})
</script>

<template>
  <div class="row" :class="[
    alignItems ? `align-items-${alignItems}` : '',
    justifyContent ? `justify-content-${justifyContent}` : ''
  ]" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TRow'
}
</script>
