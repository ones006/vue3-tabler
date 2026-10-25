<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  text?: string
  target?: string
  duration?: number
  label?: string
  feedback?: string
  variant?: string
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
  copiedColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  target: '',
  duration: 2000,
  label: 'Copy',
  feedback: 'Copied!',
  variant: 'default',
  size: 'md',
  iconOnly: false,
  copiedColor: 'text-success'
})

const emit = defineEmits<{
  (e: 'copy', text: string): void
  (e: 'error', err: any): void
}>()

const isCopied = ref(false)
let timer: any = null

const copy = async () => {
  let content = props.text

  if (!content && props.target) {
    const el = document.querySelector(props.target) as any
    if (el) {
      content = el.value !== undefined ? el.value : el.innerText
    }
  }

  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(content)
    } else {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    isCopied.value = true
    emit('copy', content)

    clearTimeout(timer)
    timer = setTimeout(() => {
      isCopied.value = false
    }, props.duration)
  } catch (err) {
    emit('error', err)
  }
}
</script>

<template>
  <button
    type="button"
    :class="[
      'btn',
      variant && variant !== 'default' ? `btn-${variant}` : '',
      size === 'sm' && 'btn-sm',
      size === 'lg' && 'btn-lg',
      iconOnly && 'btn-icon',
      isCopied && 'copied'
    ]"
    data-bs-toggle="clipboard"
    :data-bs-target="target || undefined"
    :data-bs-text="text || undefined"
    @click="copy"
  >
    <slot name="copied" v-if="isCopied">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        :class="copiedColor"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
      </svg>
      <span v-if="!iconOnly" class="clipboard-feedback ms-1" :class="copiedColor">
        {{ feedback }}
      </span>
    </slot>

    <slot v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      </svg>
      <span v-if="!iconOnly" class="clipboard-label ms-1">
        {{ label }}
      </span>
    </slot>
  </button>
</template>
