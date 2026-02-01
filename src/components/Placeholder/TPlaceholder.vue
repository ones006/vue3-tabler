<script setup lang="ts">
interface Props {
  width?: number | string
  height?: number | string
  shape?: 'square' | 'rounded' | 'circle'
  animation?: 'glow' | 'wave' | 'none'
  lines?: number
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'rounded',
  animation: 'glow',
  lines: 1
})

const getWidthStyle = (lineIndex: number) => {
  if (props.lines > 1 && lineIndex > 0 && lineIndex === props.lines - 1) {
    return { width: '80%' }
  }
  if (typeof props.width === 'number') {
    return { width: `${props.width}%` }
  }
  return { width: props.width || '100%' }
}

const getLineClass = () => {
  return [
    'placeholder',
    props.animation !== 'none' ? `placeholder-${props.animation}` : '',
    props.shape === 'circle' ? 'rounded-circle' : (props.shape === 'square' ? 'rounded-0' : '')
  ]
}
</script>

<template>
  <div v-if="lines > 1" class="placeholder-glow">
    <div v-for="i in lines" :key="i" :class="getLineClass()"
      :style="[getWidthStyle(i - 1), height ? { height: height + (typeof height === 'number' ? 'px' : '') } : {}]"
      class="mb-2 d-block"></div>
  </div>
  <div v-else :class="animation !== 'none' ? `placeholder-${animation}` : ''">
    <div :class="getLineClass()"
      :style="[getWidthStyle(0), height ? { height: height + (typeof height === 'number' ? 'px' : '') } : {}]"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPlaceholder'
}
</script>
