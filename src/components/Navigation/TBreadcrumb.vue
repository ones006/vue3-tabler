<script setup lang="ts">
import { computed } from 'vue'
import TBreadcrumbItem from './TBreadcrumbItem.vue'

interface BreadcrumbItem {
  text: string
  to?: string
  href?: string
  active?: boolean
}

interface Props {
  items?: BreadcrumbItem[]
  separator?: 'dots' | 'arrows' | 'bullets'
  muted?: boolean
  alternate?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Breadcrumb',
  muted: false,
  alternate: false
})

const olClasses = computed(() => {
  return {
    'breadcrumb': true,
    [`breadcrumb-${props.separator}`]: !!props.separator,
    'breadcrumb-muted': props.muted,
    'breadcrumb-alternate': props.alternate
  }
})
</script>

<template>
  <nav :aria-label="ariaLabel">
    <ol :class="olClasses">
      <template v-if="items && items.length">
        <TBreadcrumbItem
          v-for="(item, index) in items"
          :key="index"
          :text="item.text"
          :to="item.to"
          :href="item.href"
          :active="item.active || index === items.length - 1"
        />
      </template>
      <slot />
    </ol>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'TBreadcrumb'
}
</script>
