<script setup lang="ts">
interface Item {
  title: string
  content?: string
  variant?: string
}

interface Props {
  items?: Item[]
}

defineProps<Props>()
</script>

<template>
  <div class="datagrid">
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
