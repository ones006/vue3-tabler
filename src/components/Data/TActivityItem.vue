<script setup lang="ts">
interface Props {
  avatar?: string
  avatarText?: string
  title?: string
  description?: string
  time?: string
  active?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="py-3">
    <div class="row">
      <div v-if="avatar || avatarText || $slots.avatar" class="col-auto">
        <slot name="avatar">
          <span class="avatar avatar-sm" :style="avatar ? { backgroundImage: `url(${avatar})` } : {}">
            {{ avatarText }}
          </span>
        </slot>
      </div>
      <div class="col">
        <div class="text-truncate">
          <slot>
            <strong>{{ title }}</strong> {{ description }}
          </slot>
        </div>
        <div v-if="time" class="text-secondary">{{ time }}</div>
      </div>
      <div v-if="active || $slots.active" class="col-auto align-self-center">
        <slot name="active">
          <div class="badge bg-primary"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TActivityItem'
}
</script>
