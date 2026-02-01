<script setup lang="ts">
import { inject, computed } from 'vue'

interface Props {
  id?: string
  title?: string
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: () => `accordion-item-${Math.random().toString(36).slice(2, 9)}`,
  title: '',
  visible: false,
})

const parentId = inject<string | null>('accordion-id', null)
const parentSelector = computed(() => parentId ? `#${parentId}` : null)
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button"
        :class="{ collapsed: !visible }"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#${id}`"
        :aria-expanded="visible"
        :aria-controls="id"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </button>
    </h2>
    <div
      :id="id"
      class="accordion-collapse collapse"
      :class="{ show: visible }"
      :data-bs-parent="parentSelector"
    >
      <div class="accordion-body pt-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TAccordionItem'
}
</script>
