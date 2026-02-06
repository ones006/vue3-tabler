<script setup lang="ts">
import { inject, type Component } from 'vue'

interface Step {
  title: string
  href?: string
  active?: boolean
  tooltip?: string
}

interface Props {
  items: Step[]
  variant?: string
  counter?: boolean
  linkComponent?: Component
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'blue',
  counter: false
})

// Inject global link component if available
const injectedLinkComponent = inject<Component | undefined>('linkComponent', undefined)

// Get the appropriate link component
const getLinkComponent = (href?: string) => {
  if (!href) return 'span'
  if (isExternalLink(href)) return 'a'
  return props.linkComponent || injectedLinkComponent || 'a'
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
  <div class="steps" :class="[
    `steps-${variant}`,
    { 'steps-counter': counter }
  ]">
    <template v-for="(step, index) in items" :key="index">
      <component
        :is="getLinkComponent(step.href)"
        v-if="step.href"
        :to="step.href && !isExternalLink(step.href) ? step.href : undefined"
        :href="step.href && isExternalLink(step.href) ? step.href : undefined"
        class="step-item"
        :class="{ active: step.active }"
        data-bs-toggle="tooltip"
        :title="step.tooltip">
        {{ step.title }}
      </component>
      <span v-else class="step-item" :class="{ active: step.active }" data-bs-toggle="tooltip" :title="step.tooltip">
        {{ step.title }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TSteps'
}
</script>
