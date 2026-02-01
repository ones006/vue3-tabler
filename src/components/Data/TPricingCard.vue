<script setup lang="ts">
interface Feature {
  text: string
  active?: boolean
}

interface Props {
  title: string
  price: string | number
  period?: string
  features?: Feature[]
  buttonText?: string
  buttonVariant?: string
  highlighted?: boolean
  ribbonText?: string
  ribbonColor?: string
  ribbonIcon?: any
}

withDefaults(defineProps<Props>(), {
  period: '',
  features: () => [],
  buttonText: 'Choose plan',
  buttonVariant: 'primary',
  highlighted: false,
  ribbonColor: 'green'
})
</script>

<template>
  <div :class="['card card-md', highlighted ? 'card-active' : '']">
    <div v-if="ribbonText || $slots.ribbon" :class="['ribbon ribbon-top ribbon-bookmark', `bg-${ribbonColor}`]">
      <slot name="ribbon">
        <component v-if="ribbonIcon" :is="ribbonIcon" class="icon" />
        <span v-else>{{ ribbonText }}</span>
      </slot>
    </div>
    <div class="card-body text-center">
      <div class="text-uppercase text-secondary font-weight-medium">{{ title }}</div>
      <div class="display-5 fw-bold my-3">
        {{ price }}<span v-if="period" class="text-secondary h3 fw-normal">/{{ period }}</span>
      </div>
      <ul class="list-unstyled lh-lg">
        <slot>
          <li v-for="(feature, index) in features" :key="index">
            <template v-if="feature.active !== false">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon me-1 text-success" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
              <span v-html="feature.text"></span>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon me-1 text-danger" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
              <span class="text-secondary" v-html="feature.text"></span>
            </template>
          </li>
        </slot>
      </ul>
      <div class="text-center mt-4">
        <slot name="button">
          <a href="#" :class="['btn w-100', `btn-${buttonVariant}`]">{{ buttonText }}</a>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPricingCard'
}
</script>
