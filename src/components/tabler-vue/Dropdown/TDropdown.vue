<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text?: string
  variant?: string
  outline?: boolean
  ghost?: boolean
  size?: 'sm' | 'md' | 'lg'
  split?: boolean
  noCaret?: boolean
  right?: boolean
  dropup?: boolean
  dropend?: boolean
  dropstart?: boolean
  autoClose?: boolean | 'inside' | 'outside'
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'secondary',
  outline: false,
  ghost: false,
  size: 'md',
  split: false,
  noCaret: false,
  right: false,
  dropup: false,
  dropend: false,
  dropstart: false,
  autoClose: true,
})

const classes = computed(() => {
  return {
    'dropdown': !props.dropup && !props.dropend && !props.dropstart,
    'dropup': props.dropup,
    'dropend': props.dropend,
    'dropstart': props.dropstart,
  }
})

const buttonClasses = computed(() => {
  const base = props.outline ? `btn-outline-${props.variant}` : (props.ghost ? `btn-ghost-${props.variant}` : `btn-${props.variant}`)
  return {
    'btn': true,
    [base]: true,
    'dropdown-toggle': !props.noCaret,
    [`btn-${props.size}`]: props.size !== 'md',
  }
})

const menuClasses = computed(() => {
  return {
    'dropdown-menu': true,
    'dropdown-menu-end': props.right,
  }
})
</script>

<template>
  <div :class="classes">
    <button
      v-if="!split"
      :class="buttonClasses"
      type="button"
      data-bs-toggle="dropdown"
      :data-bs-auto-close="autoClose"
      aria-expanded="false"
    >
      <slot name="button-content">
        {{ text }}
      </slot>
    </button>

    <template v-else>
      <button
        :class="[
          'btn',
          outline ? `btn-outline-${variant}` : (ghost ? `btn-ghost-${variant}` : `btn-${variant}`),
          size !== 'md' ? `btn-${size}` : ''
        ]"
        type="button"
      >
        <slot name="button-content">
          {{ text }}
        </slot>
      </button>
      <button
        type="button"
        :class="[buttonClasses, 'dropdown-toggle-split']"
        data-bs-toggle="dropdown"
        :data-bs-auto-close="autoClose"
        aria-expanded="false"
      >
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
    </template>

    <div :class="menuClasses">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TDropdown'
}
</script>
