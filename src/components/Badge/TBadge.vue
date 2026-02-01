<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: string
  outline?: boolean
  pill?: boolean
  soft?: boolean // correspond to -lt suffix
  size?: 'sm' | 'md' | 'lg'
  notification?: boolean
  dot?: boolean
  blink?: boolean
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: '',
  outline: false,
  pill: false,
  soft: false,
  size: 'md',
  notification: false,
  dot: false,
  blink: false,
  iconOnly: false,
})

const classes = computed(() => {
  const baseVariant = props.variant || 'default'
  return {
    'badge': true,
    [`bg-${baseVariant}`]: !props.outline && !props.soft && !props.dot,
    [`bg-${baseVariant}-lt`]: props.soft,
    [`text-${baseVariant}`]: props.outline,
    [`bg-${baseVariant}`]: props.dot,
    'badge-outline': props.outline,
    'badge-pill': props.pill,
    'badge-notification': props.notification,
    'badge-dot': props.dot,
    'badge-blink': props.blink,
    [`badge-${props.size}`]: props.size !== 'md',
    'badge-icononly': props.iconOnly,
  }
})
</script>

<template>
  <span :class="classes">
    <slot name="icon" />
    <slot />
  </span>
</template>

<script lang="ts">
export default {
  name: 'TBadge'
}
</script>
