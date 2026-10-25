<script setup lang="ts">
export interface Props {
  avatar?: string
  app?: string
  color?: string
  href?: string
  prefix?: string
}

withDefaults(defineProps<Props>(), {
  avatar: '',
  app: '',
  color: '',
  href: '',
  prefix: '@'
})
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href || undefined"
    class="mention"
  >
    <span
      v-if="avatar"
      class="mention-avatar"
      :style="{ backgroundImage: `url(${avatar})` }"
      aria-hidden="true"
    ></span>
    <span
      v-else-if="app"
      class="mention-app"
      :style="{ backgroundImage: `url(${app})` }"
      aria-hidden="true"
    ></span>
    <span
      v-else-if="color"
      :class="['badge badge-dot', `bg-${color}`]"
      aria-hidden="true"
    ></span>

    <span v-if="prefix" class="visually-hidden">{{ prefix }}</span>
    <slot />
  </component>
</template>
