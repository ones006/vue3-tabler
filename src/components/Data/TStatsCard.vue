<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  subtitle?: string
  trend?: string | number
  trendType?: 'up' | 'down' | 'neutral'
  variant?: string
  icon?: any
  loading?: boolean
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
        <div v-if="trend" class="col-auto">
          <span :class="[
            'd-inline-flex align-items-center lh-1',
            trendType === 'up' ? 'text-green' : trendType === 'down' ? 'text-red' : 'text-secondary'
          ]">
            {{ trend }}
            <svg v-if="trendType === 'up'" xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 17l6 -6l4 4l8 -8" />
              <path d="M14 7l7 0l0 7" />
            </svg>
            <svg v-if="trendType === 'down'" xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 7l6 6l4 -4l8 8" />
              <path d="M14 17l7 0l0 -7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TStatsCard'
}
</script>
