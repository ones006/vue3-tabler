<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue'
import { useThemeStore } from '../../../stores/theme'

interface Props {
  height?: string | number
  width?: string | number
  type?: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'radar' | 'polarArea'
  options?: any
  series: any[]
}

const themeStore = useThemeStore()

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: '100%',
  type: 'line',
  options: () => ({})
})

// Tabler Default Theme for ApexCharts
const defaultOptions = {
  chart: {
    fontFamily: 'inherit',
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true
    }
  },
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 2,
    lineCap: "round",
    curve: "smooth",
  },
  grid: {
    padding: {
      top: -20,
      right: 0,
      left: -4,
      bottom: -4
    },
    strokeDashArray: 4,
  },
  xaxis: {
    labels: {
      padding: 0,
    },
    tooltip: {
      enabled: false
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      padding: 4
    },
  },
  colors: [
    '#206bc4', // blue
    '#5eba00', // green
    '#ff922b', // orange
    '#d63939', // red
    '#4299e1', // azure
    '#f59f00', // yellow
    '#ae3ec9', // purple
    '#0ca678', // teal
  ],
  legend: {
    show: true,
    position: 'bottom',
    offsetY: 12,
    markers: {
      width: 10,
      height: 10,
      radius: 100,
    },
    itemMargin: {
      horizontal: 8,
      vertical: 8
    },
  },
}

const mergedOptions = computed(() => {
  const isDark = document.body.getAttribute('data-bs-theme') === 'dark' || document.documentElement.getAttribute('data-bs-theme') === 'dark'

  // Theme-dependent overrides
  const themeOverrides = {
    chart: {
      foreColor: isDark ? '#fcfdfe' : 'inherit',
    },
    grid: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(101, 109, 119, 0.16)'
    }
  }

  // Deep merge utility or just spread for now since we know the structure
  return {
    ...defaultOptions,
    ...props.options,
    chart: {
      ...defaultOptions.chart,
      ...props.options?.chart,
      ...themeOverrides.chart,
      type: props.type
    },
    grid: {
      ...defaultOptions.grid,
      ...props.options?.grid,
      ...themeOverrides.grid
    }
  }
})

// Force re-render on theme change to update colors correctly if needed
// Although computed property should handle it if 'data-bs-theme' was reactive.
// Start looking at DOM mutations for theme? Or use the store.

// We need a way to trigger re-calculation when theme changes.
// Since we can't easily watch DOM attributes reactively without MutationObserver,
// we rely on Pinia store state which IS reactive.

const currentTheme = computed(() => themeStore.theme)

// Re-compute merged options when themeStore.theme changes
const finalOptions = computed(() => {
  // Access currentTheme to trigger dependency
  const theme = currentTheme.value
  const isDark = theme === 'dark'

  return {
    ...mergedOptions.value, // Base merge
    chart: {
      ...mergedOptions.value.chart,
      foreColor: isDark ? '#fcfdfe' : 'inherit',
    },
    grid: {
      ...mergedOptions.value.grid,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(101, 109, 119, 0.16)'
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light'
    }
  }
})
</script>

<template>
  <div class="chart-container">
    <VueApexCharts :type="type" :height="height" :width="width" :options="finalOptions" :series="series" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TChart'
}
</script>
