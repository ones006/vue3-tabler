<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  headerLight?: boolean
  borderless?: boolean
  stacked?: boolean
  active?: boolean
  inactive?: boolean
  statusTop?: string
  statusBottom?: string
  statusStart?: string
  statusEnd?: string
  rotateEnd?: boolean
  rotateStart?: boolean
  link?: boolean
  linkPop?: boolean
  linkRotate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  headerLight: false,
  borderless: false,
  stacked: false,
  active: false,
  inactive: false,
  statusTop: '',
  statusBottom: '',
  statusStart: '',
  statusEnd: '',
  rotateEnd: false,
  rotateStart: false,
  link: false,
  linkPop: false,
  linkRotate: false,
})

const classes = computed(() => {
  return {
    'card': true,
    'card-borderless': props.borderless,
    'card-stacked': props.stacked,
    'card-active': props.active,
    'card-inactive': props.inactive,
    'card-rotate-end': props.rotateEnd,
    'card-rotate-start': props.rotateStart,
    'card-link': props.link || props.linkPop || props.linkRotate,
    'card-link-pop': props.linkPop,
    'card-link-rotate': props.linkRotate,
  }
})

const headerClasses = computed(() => {
  return {
    'card-header': true,
    'card-header-light': props.headerLight,
  }
})
</script>

<template>
  <div :class="classes">
    <!-- Status bars -->
    <div v-if="statusTop" :class="`card-status-top bg-${statusTop}`"></div>
    <div v-if="statusBottom" :class="`card-status-bottom bg-${statusBottom}`"></div>
    <div v-if="statusStart" :class="`card-status-start bg-${statusStart}`"></div>
    <div v-if="statusEnd" :class="`card-status-end bg-${statusEnd}`"></div>

    <!-- Stamp -->
    <div v-if="$slots.stamp" class="card-stamp">
      <slot name="stamp" />
    </div>

    <!-- Ribbon -->
    <slot name="ribbon" />

    <!-- Header -->
    <div v-if="title || $slots.header || $slots.title" :class="headerClasses">
      <h3 v-if="title || $slots.title" class="card-title">
        <slot name="title">{{ title }}</slot>
        <span v-if="subtitle" class="card-subtitle">{{ subtitle }}</span>
      </h3>
      <slot name="header" />
    </div>

    <!-- Image Top -->
    <slot name="img-top" />

    <!-- Body -->
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>

    <!-- Image Bottom -->
    <slot name="img-bottom" />

    <!-- Progress -->
    <slot name="progress" />

    <!-- Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TCard'
}
</script>
