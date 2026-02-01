<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'blue',
  counter: false
})

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
        :is="step.href && !isExternalLink(step.href) ? RouterLink : 'a'"
        v-if="step.href"
        :to="step.href"
        :href="step.href"
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
