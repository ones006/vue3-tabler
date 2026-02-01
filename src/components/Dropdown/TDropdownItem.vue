<script setup lang="ts">
interface Props {
  href?: string
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  active: false,
  disabled: false,
})
</script>

<template>
  <a
    :href="href"
    class="dropdown-item"
    :class="{ active: active, disabled: disabled }"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />
    <slot />
  </a>
</template>

<script lang="ts">
export default {
  name: 'TDropdownItem'
}
</script>
