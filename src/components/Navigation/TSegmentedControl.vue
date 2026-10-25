<script setup lang="ts">
import { computed } from 'vue'

interface SegmentItem {
  label: string
  value?: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  items?: (SegmentItem | string)[]
  fullWidth?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  fullWidth: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const normalizedItems = computed<SegmentItem[]>(() => {
  return props.items.map(item => {
    if (typeof item === 'string') {
      return { label: item, value: item }
    }
    return {
      label: item.label,
      value: item.value !== undefined ? item.value : item.label,
      disabled: item.disabled
    }
  })
})

const selectItem = (val: string | number | undefined) => {
  if (val === undefined || props.disabled) return
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <nav
    class="nav nav-segmented"
    :class="{ 'w-100': fullWidth }"
    role="tablist"
  >
    <template v-if="normalizedItems.length">
      <button
        v-for="(item, idx) in normalizedItems"
        :key="idx"
        type="button"
        class="nav-link"
        :class="{ active: modelValue === item.value }"
        :disabled="disabled || item.disabled"
        role="tab"
        :aria-selected="modelValue === item.value"
        @click="selectItem(item.value)"
      >
        <slot :name="`item-${idx}`" :item="item">
          {{ item.label }}
        </slot>
      </button>
    </template>
    <slot />
  </nav>
</template>

<script lang="ts">
export default {
  name: 'TSegmentedControl'
}
</script>
