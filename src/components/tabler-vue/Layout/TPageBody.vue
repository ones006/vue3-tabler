<script setup lang="ts">
interface Props {
  fluid?: boolean
}
withDefaults(defineProps<Props>(), {
  fluid: false
})
</script>

<template>
  <div class="page-body">
    <div :class="fluid ? 'container-fluid' : 'container-xl'">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPageBody'
}
</script>
