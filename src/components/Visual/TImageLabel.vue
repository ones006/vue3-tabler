<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src?: string
  alt?: string
  text?: string
  position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  iconOnly?: boolean
  width?: string | number
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-end',
  iconOnly: false,
  rounded: true
})

const positionClass = computed(() => {
  if (props.position === 'bottom-end') return ''
  return `img-label-${props.position}`
})
</script>

<template>
  <div class="img-labeled">
    <img
      v-if="src"
      :src="src"
      :alt="alt || ''"
      :width="width"
      :class="{ rounded }"
    />
    <slot name="image" />
    <span class="img-label" :class="[positionClass, { 'img-label-icon': iconOnly }]">
      <slot name="icon" />
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TImageLabel'
}
</script>
