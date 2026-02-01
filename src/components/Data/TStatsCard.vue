<script setup lang="ts">
import { IconArrowUp, IconArrowDown, IconMinus } from '@tabler/icons-vue'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  trend?: string | number
  trendType?: 'up' | 'down' | 'neutral'
  variant?: string
  icon?: any
  loading?: boolean
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  trendType: 'neutral',
  variant: 'primary'
})
</script>

<template>
  <div class="card card-sm">
    <div class="card-body">
      <div class="row align-items-center">
        <div v-if="icon || $slots.icon" class="col-auto">
          <span :class="['bg-active text-white avatar', `bg-${variant}`]">
            <component v-if="icon" :is="icon" class="icon" />
            <slot v-else name="icon" />
          </span>
        </div>
        <div class="col">
          <div class="font-weight-medium">
            {{ title }}
          </div>
          <div class="text-secondary">
            {{ subtitle }}
          </div>
        </div>
      </div>
      <div class="mt-2 row align-items-end">
        <div class="col">
          <div class="h1 mb-0">{{ value }}</div>
        </div>
        <!-- Render trend in body if NO description is present (legacy/compact mode) -->
        <div v-if="trend && !description" class="col-auto">
          <span :class="[
            'd-inline-flex align-items-center lh-1',
            trendType === 'up' ? 'text-green' : trendType === 'down' ? 'text-red' : 'text-secondary'
          ]">
            {{ trend }}
            <IconArrowUp v-if="trendType === 'up'" class="icon ms-1" />
            <IconArrowDown v-if="trendType === 'down'" class="icon ms-1" />
            <IconMinus v-if="trendType === 'neutral'" class="icon ms-1" />
          </span>
        </div>
      </div>
    </div>
    
    <!-- Render Footer design if description is present -->
    <div v-if="description || $slots.footer" class="card-footer border-0 bg-transparent pt-0">
      <slot name="footer">
        <div v-if="description">
          <span :class="[
            'd-inline-flex align-items-center lh-1',
            trendType === 'up' ? 'text-green' : trendType === 'down' ? 'text-red' : 'text-secondary'
          ]">
            {{ trend }}
            <IconArrowUp v-if="trendType === 'up'" class="icon ms-1" />
            <IconArrowDown v-if="trendType === 'down'" class="icon ms-1" />
            <IconMinus v-if="trendType === 'neutral'" class="icon ms-1" />
          </span>
          <span class="text-secondary ms-1">{{ description }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TStatsCard'
}
</script>
