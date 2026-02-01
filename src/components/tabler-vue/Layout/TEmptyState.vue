<script setup lang="ts">
interface Props {
  icon?: any
  title: string
  subtitle?: string
  actionText?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="empty">
    <div class="empty-icon">
      <component v-if="icon" :is="icon" class="icon" />
      <slot v-else name="icon" />
    </div>
    <p class="empty-title">{{ title }}</p>
    <p v-if="subtitle" class="empty-subtitle text-secondary">
      {{ subtitle }}
    </p>
    <div v-if="actionText || $slots.action" class="empty-action">
      <button v-if="actionText" class="btn btn-primary" @click="emit('action')">
        <slot name="action-icon" />
        {{ actionText }}
      </button>
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TEmptyState'
}
</script>
