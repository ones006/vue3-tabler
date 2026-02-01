<script setup lang="ts">
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
</script>

<template>
  <div class="steps" :class="[
    `steps-${variant}`,
    { 'steps-counter': counter }
  ]">
    <template v-for="(step, index) in items" :key="index">
      <a v-if="step.href" :href="step.href" class="step-item" :class="{ active: step.active }" data-bs-toggle="tooltip"
        :title="step.tooltip">
        {{ step.title }}
      </a>
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
