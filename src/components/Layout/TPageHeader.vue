<script setup lang="ts">
interface Props {
  title?: string
  pretitle?: string
}
defineProps<Props>()
</script>

<template>
  <div class="page-header d-print-none" v-bind="$attrs">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div v-if="pretitle" class="page-pretitle">
            {{ pretitle }}
          </div>
          <h2 v-if="title || $slots.title" class="page-title">
            <slot name="title">{{ title }}</slot>
          </h2>
        </div>
        <div v-if="$slots.actions" class="col-auto ms-auto d-print-none">
          <div class="btn-list">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TPageHeader'
}
</script>
