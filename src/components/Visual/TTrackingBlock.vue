<script setup lang="ts">
export interface Props {
  status?: 'success' | 'warning' | 'danger' | 'info' | string
  tooltip?: string
}

withDefaults(defineProps<Props>(), {
  status: '',
  tooltip: ''
})
</script>

<template>
  <div
    :class="['tracking-block', status ? `bg-${status}` : '']"
    :data-bs-toggle="tooltip ? 'tooltip' : undefined"
    :data-bs-placement="'top'"
    :title="tooltip"
  ></div>
</template>

<style scoped>
.tracking-block {
  flex: 1 1 0%;
  height: 1.5rem;
  border-radius: var(--tblr-border-radius-xs, 2px);
  background-color: var(--tblr-border-color, #e6e7e9);
  transition: opacity 0.15s ease, transform 0.15s ease;
  cursor: pointer;
}

.tracking-block:hover {
  opacity: 0.85;
  transform: scaleY(1.1);
}
</style>
