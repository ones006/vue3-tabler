<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  country: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  title?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const countryCode = computed(() => {
  return props.country.toLowerCase()
})

const classes = computed(() => {
  return {
    'flag': true,
    [`flag-country-${countryCode.value}`]: !!countryCode.value,
    [`flag-${props.size}`]: props.size !== 'md'
  }
})
</script>

<template>
  <span
    :class="classes"
    :title="title || ariaLabel || countryCode.toUpperCase()"
    role="img"
    :aria-label="ariaLabel || title || countryCode.toUpperCase()"
  ></span>
</template>

<script lang="ts">
export default {
  name: 'TFlag'
}
</script>
