<script setup lang="ts">
export interface TrackingItem {
  status?: 'success' | 'warning' | 'danger' | 'info' | string
  tooltip?: string
  date?: string
}

export interface Props {
  items?: TrackingItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>

<template>
  <div class="tracking">
    <slot>
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="['tracking-block', item.status ? `bg-${item.status}` : '']"
        :data-bs-toggle="item.tooltip ? 'tooltip' : undefined"
        :title="item.tooltip"
      ></div>
    </slot>
  </div>
</template>

<style scoped>
.tracking {
  display: flex;
  gap: 0.125rem;
  width: 100%;
}

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
