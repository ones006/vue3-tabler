<script setup lang="ts">
import { inject, type Component } from 'vue'

interface Props {
  text?: string
  variant?: string
  rounded?: boolean
  link?: string
  removable?: boolean
  linkComponent?: Component
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  rounded: false,
  removable: false
})

const emit = defineEmits(['remove'])

// Inject global link component if available
const injectedLinkComponent = inject<Component | undefined>('linkComponent', undefined)

// Use prop linkComponent, or fallback to injected, or use plain 'a' tag
const getLinkComponent = () => {
  if (!props.link) return 'span'
  if (isExternalLink(props.link)) return 'a'
  return props.linkComponent || injectedLinkComponent || 'a'
}

const onRemove = () => {
  emit('remove')
}

const isExternalLink = (href: string) => {
  try {
    const url = new URL(href, window.location.origin)
    return url.origin !== window.location.origin
  } catch {
    // If URL parsing fails, treat as relative/internal
    return false
  }
}
</script>

<template>
  <component 
    :is="getLinkComponent()"
    :to="link && !isExternalLink(link) ? link : undefined"
    :href="link && isExternalLink(link) ? link : undefined"
    class="tag" 
    :class="[
      `tag-${variant}`,
      { 'tag-rounded': rounded }
    ]">
    <slot>{{ text }}</slot>
    <a v-if="removable" href="javascript:void(0)" class="tag-addon" @click.stop="onRemove">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M18 6l-12 12"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </a>
  </component>
</template>

<script lang="ts">
export default {
  name: 'TTag'
}
</script>
