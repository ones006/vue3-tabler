<script setup lang="ts">
import { computed } from 'vue'

interface GalleryItem {
  src: string
  alt?: string
}

interface Props {
  items?: (GalleryItem | string)[]
  indicators?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  indicators: true,
  rounded: true
})

const normalizedItems = computed<GalleryItem[]>(() => {
  return props.items.map(item => {
    if (typeof item === 'string') {
      return { src: item, alt: '' }
    }
    return item
  })
})

const classes = computed(() => {
  return {
    'hover-gallery': true,
    'hover-gallery-indicators': props.indicators,
    'rounded': props.rounded
  }
})
</script>

<template>
  <div :class="classes">
    <template v-if="normalizedItems.length">
      <div v-for="(item, index) in normalizedItems" :key="index" class="hover-gallery-item">
        <img :src="item.src" :alt="item.alt || ''" />
      </div>
    </template>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'THoverGallery'
}
</script>
