<script setup lang="ts">
interface Props {
  divide?: boolean
}

withDefaults(defineProps<Props>(), {
  divide: true
})
</script>

<template>
  <div :class="[divide ? 'divide-y' : '']">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TActivityList'
}
</script>
