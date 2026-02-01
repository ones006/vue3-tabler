<script setup lang="ts">
interface Props {
  fluid?: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="page">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPage'
}
</script>
