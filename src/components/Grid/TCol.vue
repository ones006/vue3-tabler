<script setup lang="ts">
interface Props {
  cols?: number | string | 'auto'
  xs?: number | string | 'auto'
  sm?: number | string | 'auto'
  md?: number | string | 'auto'
  lg?: number | string | 'auto'
  xl?: number | string | 'auto'
  xxl?: number | string | 'auto'
  offset?: number | string
  order?: number | string
}

const props = defineProps<Props>()

const getClasses = () => {
  const classes = []

  if (props.cols) classes.push(props.cols === 'auto' ? 'col-auto' : `col-${props.cols}`)
  else if (!props.xs && !props.sm && !props.md && !props.lg && !props.xl && !props.xxl) classes.push('col')

  if (props.xs) classes.push(props.xs === 'auto' ? 'col-auto' : `col-${props.xs}`)
  if (props.sm) classes.push(props.sm === 'auto' ? 'col-sm-auto' : `col-sm-${props.sm}`)
  if (props.md) classes.push(props.md === 'auto' ? 'col-md-auto' : `col-md-${props.md}`)
  if (props.lg) classes.push(props.lg === 'auto' ? 'col-lg-auto' : `col-lg-${props.lg}`)
  if (props.xl) classes.push(props.xl === 'auto' ? 'col-xl-auto' : `col-xl-${props.xl}`)
  if (props.xxl) classes.push(props.xxl === 'auto' ? 'col-xxl-auto' : `col-xxl-${props.xxl}`)

  if (props.offset) classes.push(`offset-${props.offset}`)
  if (props.order) classes.push(`order-${props.order}`)

  return classes
}
</script>

<template>
  <div :class="getClasses()">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TCol'
}
</script>
