<script setup lang="ts">
import { computed } from 'vue'

interface Field {
  key: string
  label?: string
  sortable?: boolean
  class?: string
  width?: string
}

interface Props {
  items: any[]
  fields?: Field[]
  striped?: boolean
  hover?: boolean
  card?: boolean
  vCenter?: boolean
  responsive?: boolean
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  fields: undefined,
  striped: false,
  hover: false,
  card: true,
  vCenter: true,
  responsive: true,
  size: 'md',
})

const computedFields = computed<Field[]>(() => {
  if (props.fields) return props.fields
  if (props.items.length === 0) return []
  return Object.keys(props.items[0]).map(key => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    class: '',
    width: ''
  }))
})

const tableClasses = computed(() => {
  return {
    'table': true,
    'table-vcenter': props.vCenter,
    'card-table': props.card,
    'table-striped': props.striped,
    'table-hover': props.hover,
    [`table-${props.size}`]: props.size !== 'md',
  }
})
</script>

<template>
  <div :class="{ 'table-responsive': responsive }">
    <table :class="tableClasses">
      <thead>
        <tr>
          <th
            v-for="field in computedFields"
            :key="field.key"
            :class="field.class"
            :style="{ width: field.width }"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="field in computedFields"
            :key="field.key"
            :class="field.class"
          >
            <slot :name="`cell(${field.key})`" :item="item" :index="index">
              {{ item[field.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TTable'
}
</script>
