<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  label?: string
  value?: string | number
  active?: boolean
  off?: boolean
  large?: boolean
  tag?: string
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  label: '',
  active: false,
  off: false,
  large: false,
  tag: 'span',
  interactive: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const computedTag = computed(() => {
  if (props.interactive && props.tag === 'span') return 'button'
  return props.tag
})

const classes = computed(() => {
  return {
    'legend': true,
    [`legend-${props.color}`]: !!props.color,
    'active': props.active,
    'legend-off': props.off,
    'legend-lg': props.large
  }
})

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <component
    :is="computedTag"
    :type="computedTag === 'button' ? 'button' : undefined"
    :class="classes"
    @click="handleClick"
  >
    <span class="legend-dot"></span>
    <slot>{{ label }}</slot>
    <span v-if="value !== undefined && value !== ''" class="legend-value">
      <slot name="value">{{ value }}</slot>
    </span>
  </component>
</template>

<script lang="ts">
export default {
  name: 'TLegend'
}
</script>
