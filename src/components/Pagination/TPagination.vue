<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  total?: number
  perPage?: number
  size?: 'sm' | 'lg'
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  total: 0,
  perPage: 10,
  align: 'start'
})

const emit = defineEmits(['update:modelValue', 'change'])

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const pages = computed(() => {
  const current = props.modelValue
  const last = totalPages.value
  const delta = 2
  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
})

const setPage = (page: number | string) => {
  if (typeof page === 'number' && page !== props.modelValue && page >= 1 && page <= totalPages.value) {
    emit('update:modelValue', page)
    emit('change', page)
  }
}
</script>

<template>
  <ul class="pagination" :class="[
    size ? `pagination-${size}` : '',
    align ? `justify-content-${align}` : ''
  ]">
    <li class="page-item" :class="{ disabled: modelValue === 1 }">
      <a class="page-link" href="javascript:void(0)" @click.prevent="setPage(modelValue - 1)" tabindex="-1"
        aria-disabled="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        prev
      </a>
    </li>

    <li v-for="(page, index) in pages" :key="index" class="page-item" :class="{
      active: page === modelValue,
      disabled: page === '...'
    }">
      <a class="page-link" href="javascript:void(0)" @click.prevent="setPage(page)">
        {{ page }}
      </a>
    </li>

    <li class="page-item" :class="{ disabled: modelValue === totalPages }">
      <a class="page-link" href="javascript:void(0)" @click.prevent="setPage(modelValue + 1)">
        next
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'TPagination'
}
</script>
