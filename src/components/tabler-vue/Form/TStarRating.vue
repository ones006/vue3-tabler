<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue?: number
  max?: number
  readonly?: boolean
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  readonly: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const hoverValue = ref(0)

const setRating = (val: number) => {
  if (props.readonly) return
  emit('update:modelValue', val)
  emit('change', val)
}

const onHover = (val: number) => {
  if (props.readonly) return
  hoverValue.value = val
}

const onLeave = () => {
  hoverValue.value = 0
}
</script>

<template>
  <div class="star-rating d-inline-flex align-items-center" @mouseleave="onLeave">
    <div v-for="i in max" :key="i" class="star-item cursor-pointer text-yellow"
      :class="{ 'opacity-20': (hoverValue || modelValue) < i }" @mouseover="onHover(i)" @click="setRating(i)">
      <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" width="24" height="24" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.opacity-20 {
  opacity: 0.2;
}

.star-item {
  transition: opacity 0.2s, transform 0.2s;
}

.star-item:hover {
  transform: scale(1.1);
}
</style>

<script lang="ts">
export default {
  name: 'TStarRating'
}
</script>
