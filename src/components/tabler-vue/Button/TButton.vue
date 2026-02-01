<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: string
  outline?: boolean
  ghost?: boolean
  square?: boolean
  pill?: boolean
  icon?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  outline: false,
  ghost: false,
  square: false,
  pill: false,
  icon: false,
  size: 'md',
  disabled: false,
  type: 'button',
  loading: false,
})

const classes = computed(() => {
  return {
    'btn': true,
    [`btn-${props.variant}`]: !props.outline && !props.ghost,
    [`btn-outline-${props.variant}`]: props.outline,
    [`btn-ghost-${props.variant}`]: props.ghost,
    [`btn-${props.size}`]: props.size !== 'md',
    'btn-square': props.square,
    'btn-pill': props.pill,
    'btn-icon': props.icon,
    'btn-loading': props.loading,
  }
})
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled || loading">
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script lang="ts">
export default {
  name: 'TButton'
}
</script>
