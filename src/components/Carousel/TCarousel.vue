<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Carousel } from '@tabler/core'

interface Slide {
  image?: string
  title?: string
  description?: string
  interval?: number
}

interface Props {
  items: Slide[]
  id?: string
  controls?: boolean
  indicators?: boolean
  fade?: boolean
  autoplay?: boolean
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  id: () => `carousel-${Math.random().toString(36).substr(2, 9)}`,
  controls: true,
  indicators: true,
  fade: false,
  autoplay: true,
  interval: 5000
})

const carouselRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (carouselRef.value) {
    new Carousel(carouselRef.value, {
      interval: props.interval,
      ride: props.autoplay ? 'carousel' : false,
      pause: 'hover'
    })
  }
})
</script>

<template>
  <div :id="id" ref="carouselRef" class="carousel slide" :class="{ 'carousel-fade': fade }" data-bs-ride="carousel">
    <div v-if="indicators" class="carousel-indicators">
      <button v-for="(_, index) in items" :key="index" type="button" :data-bs-target="`#${id}`"
        :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : 'false'"
        :aria-label="`Slide ${index + 1}`"></button>
    </div>

    <div class="carousel-inner">
      <div v-for="(item, index) in items" :key="index" class="carousel-item" :class="{ active: index === 0 }"
        :data-bs-interval="item.interval">
        <img v-if="item.image" :src="item.image" class="d-block w-100" :alt="item.title">
        <slot :name="`slide-${index}`" :item="item">
          <div v-if="item.title || item.description" class="carousel-caption d-none d-md-block">
            <h5 v-if="item.title">{{ item.title }}</h5>
            <p v-if="item.description">{{ item.description }}</p>
          </div>
        </slot>
      </div>
    </div>

    <template v-if="controls">
      <button class="carousel-control-prev" type="button" :data-bs-target="`#${id}`" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" :data-bs-target="`#${id}`" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TCarousel'
}
</script>
