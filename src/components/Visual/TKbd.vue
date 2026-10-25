<script setup lang="ts">
interface Props {
  keyName?: string
}

defineProps<Props>()
</script>

<template>
  <kbd class="kbd"><slot>{{ keyName }}</slot></kbd>
</template>

<script lang="ts">
export default {
  name: 'TKbd'
}
</script>
