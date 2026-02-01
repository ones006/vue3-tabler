<script setup lang="ts">
interface Props {
  text?: string
  variant?: string
  rounded?: boolean
  link?: string
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  rounded: false,
  removable: false
})

const emit = defineEmits(['remove'])

const onRemove = () => {
  emit('remove')
}
</script>

<template>
  <component :is="link ? 'a' : 'span'" :href="link" class="tag" :class="[
    `tag-${variant}`,
    { 'tag-rounded': rounded }
  ]">
    <slot>{{ text }}</slot>
    <a v-if="removable" href="javascript:void(0)" class="tag-addon" @click.stop="onRemove">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M18 6l-12 12"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </a>
  </component>
</template>

<script lang="ts">
export default {
  name: 'TTag'
}
</script>
