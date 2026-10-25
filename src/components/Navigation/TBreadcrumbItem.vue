<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useLinkComponent } from '@/composables/useLinkComponent'

interface Props {
  to?: string
  href?: string
  active?: boolean
  text?: string
  linkComponent?: Component
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  text: ''
})

const { getLinkComponent, isExternalLink } = useLinkComponent(props.linkComponent)

const linkTarget = computed(() => props.to || props.href)
const hasLink = computed(() => !props.active && !!linkTarget.value)
</script>

<template>
  <li class="breadcrumb-item" :class="{ active }" :aria-current="active ? 'page' : undefined">
    <component
      :is="getLinkComponent(linkTarget)"
      v-if="hasLink"
      :to="to && !isExternalLink(to) ? to : undefined"
      :href="href || (to && isExternalLink(to) ? to : undefined)"
    >
      <slot>{{ text }}</slot>
    </component>
    <slot v-else>{{ text }}</slot>
  </li>
</template>

<script lang="ts">
export default {
  name: 'TBreadcrumbItem'
}
</script>
