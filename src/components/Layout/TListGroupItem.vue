<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useLinkComponent } from '@/composables/useLinkComponent'

interface Props {
  tag?: string
  active?: boolean
  disabled?: boolean
  title?: string
  description?: string
  meta?: string
  to?: string
  href?: string
  linkComponent?: Component
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false
})

const { getLinkComponent, isExternalLink } = useLinkComponent(props.linkComponent)

const linkTarget = computed(() => props.to || props.href)

const computedTag = computed(() => {
  if (linkTarget.value) return getLinkComponent(linkTarget.value)
  return props.tag || 'div'
})

const classes = computed(() => {
  return {
    'list-group-item': true,
    'list-group-item-action': !!linkTarget.value || props.tag === 'button',
    'active': props.active,
    'disabled': props.disabled
  }
})
</script>

<template>
  <component
    :is="computedTag"
    :class="classes"
    :to="to && !isExternalLink(to) ? to : undefined"
    :href="href || (to && isExternalLink(to) ? to : undefined)"
    :aria-current="active ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <div v-if="$slots.media" class="list-group-item-media">
      <slot name="media" />
    </div>

    <div v-if="title || description || $slots.content || $slots.title || $slots.description" class="list-group-item-content">
      <div v-if="title || $slots.title" class="list-group-item-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="list-group-item-description">
        <slot name="description">{{ description }}</slot>
      </div>
      <slot name="content" />
    </div>

    <slot v-if="!title && !description && !$slots.content && !$slots.title && !$slots.description" />

    <div v-if="$slots.meta || meta" class="list-group-item-meta">
      <slot name="meta">{{ meta }}</slot>
    </div>

    <div v-if="$slots.actions" class="list-group-item-actions">
      <slot name="actions" />
    </div>
  </component>
</template>

<script lang="ts">
export default {
  name: 'TListGroupItem'
}
</script>
