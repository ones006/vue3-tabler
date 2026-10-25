<script setup lang="ts">
import { computed } from 'vue'

interface Item {
  title: string
  content?: string
  variant?: string
}

interface Props {
  items?: Item[]
  horizontal?: boolean
  cols?: number
  titleWidth?: string
  itemWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false
})

const classes = computed(() => {
  return {
    'datagrid': true,
    'datagrid-horizontal': props.horizontal,
    [`datagrid-cols-${props.cols}`]: !!props.cols
  }
})

const styles = computed(() => {
  const styleObj: Record<string, string> = {}
  if (props.titleWidth) {
    styleObj['--tblr-datagrid-title-width'] = props.titleWidth
  }
  if (props.itemWidth) {
    styleObj['--tblr-datagrid-item-width'] = props.itemWidth
  }
  return styleObj
})
</script>

<template>
  <div :class="classes" :style="styles">
    <template v-if="items">
      <div v-for="(item, index) in items" :key="index" class="datagrid-item">
        <div class="datagrid-title">{{ item.title }}</div>
        <div class="datagrid-content">
          <slot :name="`item-${index}`" :item="item">
            {{ item.content }}
          </slot>
        </div>
      </div>
    </template>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TDataGrid'
}
</script>
