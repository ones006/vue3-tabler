<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

export interface Props {
  label?: string
  values?: Record<string, number>
  colors?: string[]
  map?: string
  height?: string | number
  zoom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'World map',
  values: () => ({}),
  colors: () => [],
  map: 'world',
  height: 'auto',
  zoom: true
})

const mapEl = ref<HTMLElement | null>(null)

const initMap = () => {
  const tabler = (window as any).tabler
  if (tabler?.VectorMap && mapEl.value) {
    try {
      tabler.VectorMap.getOrCreateInstance(mapEl.value, {
        values: props.values,
        colors: props.colors.length ? props.colors : undefined,
        map: props.map
      })
    } catch (_) {
      // Map instance handled by Tabler data-bs-toggle
    }
  }
}

watch(() => props.values, () => {
  initMap()
}, { deep: true })

onMounted(() => {
  initMap()
})
</script>

<template>
  <div
    ref="mapEl"
    class="vector-map"
    data-bs-toggle="vector-map"
    :data-bs-label="label"
    :data-bs-values="Object.keys(values).length ? JSON.stringify(values) : undefined"
    :data-bs-colors="colors.length ? JSON.stringify(colors) : undefined"
    :style="{ height: typeof height === 'number' ? `${height}px` : height }"
  ></div>
</template>
