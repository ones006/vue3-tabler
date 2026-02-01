<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue'

interface Props {
  title?: string
  message?: string
  variant?: string
  time?: string
  modelValue?: boolean
  autohide?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  modelValue: false,
  autohide: true,
  delay: 5000
})

const emit = defineEmits(['update:modelValue', 'close'])

let autohideTimeout: any = null

const close = () => {
  if (autohideTimeout) {
    clearTimeout(autohideTimeout)
    autohideTimeout = null
  }
  emit('update:modelValue', false)
  emit('close')
}

const startAutohide = () => {
  if (autohideTimeout) clearTimeout(autohideTimeout)
  if (props.autohide && props.modelValue) {
    autohideTimeout = setTimeout(() => {
      close()
    }, props.delay)
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    startAutohide()
  } else if (autohideTimeout) {
    clearTimeout(autohideTimeout)
    autohideTimeout = null
  }
})

onMounted(() => {
  if (props.modelValue) {
    startAutohide()
  }
})

onUnmounted(() => {
  if (autohideTimeout) clearTimeout(autohideTimeout)
})
</script>

<template>
  <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-if="modelValue">
    <div class="toast-header">
      <span v-if="!$slots.icon" class="avatar avatar-xs me-2" :class="`bg-${variant}`"></span>
      <slot name="icon" />
      <strong class="me-auto">{{ title }}</strong>
      <small v-if="time" class="text-secondary">{{ time }}</small>
      <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TToast'
}
</script>
