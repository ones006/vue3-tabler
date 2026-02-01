<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
  important?: boolean
  minor?: boolean
  dismissible?: boolean
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  important: false,
  minor: false,
  dismissible: false,
  show: true,
})

const emit = defineEmits(['update:show', 'dismissed'])

const classes = computed(() => {
  return {
    [`alert-${props.variant}`]: true,
    'alert-important': props.important,
    'alert-minor': props.minor,
    'alert-dismissible': props.dismissible,
  }
})

const dismiss = () => {
  emit('update:show', false)
  emit('dismissed')
}
</script>

<template>
  <div v-if="show" class="alert" :class="classes" role="alert">
    <div class="d-flex">
      <div v-if="$slots.icon" class="me-3">
        <slot name="icon" />
      </div>
      <div>
        <div v-if="$slots.title" class="alert-title">
          <slot name="title" />
        </div>
        <div class="text-secondary">
          <slot />
        </div>
      </div>
    </div>
    <a v-if="dismissible" class="btn-close" @click.prevent="dismiss" aria-label="close"></a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TAlert'
}
</script>
