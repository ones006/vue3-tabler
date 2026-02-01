<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number
  src?: string
  text?: string
  variant?: string
  rounded?: boolean | 'circle' | '0'
  status?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  src: '',
  text: '',
  variant: '',
  rounded: true,
  status: '',
})

const classes = computed(() => {
  const sizeClass = typeof props.size === 'number' ? `avatar-${props.size}` : `avatar-${props.size}`
  return {
    'avatar': true,
    [sizeClass]: true,
    [`bg-${props.variant}`]: props.variant && !props.variant.includes('-lt'),
    [props.variant]: props.variant && props.variant.includes('-lt'),
    'rounded-circle': props.rounded === 'circle',
    'rounded-0': props.rounded === '0',
  }
})

const styles = computed(() => {
  if (props.src) {
    return {
      backgroundImage: `url(${props.src})`
    }
  }
  return {}
})
</script>

<template>
  <span :class="classes" :style="styles">
    <slot v-if="!src">
      {{ text }}
    </slot>
    <span v-if="status" :class="`badge bg-${status}`"></span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'TAvatar'
}
</script>
