<script setup lang="ts">
export interface Props {
  author?: string
  date?: string
  avatar?: string
  me?: boolean
}

withDefaults(defineProps<Props>(), {
  author: '',
  date: '',
  avatar: '',
  me: false
})
</script>

<template>
  <div class="mb-3">
    <div :class="['row align-items-end', me ? 'justify-content-end' : '']">
      <!-- Left Avatar (if not me) -->
      <div v-if="!me && avatar" class="col-auto">
        <span class="avatar" :style="{ backgroundImage: `url(${avatar})` }"></span>
      </div>

      <div class="col-auto">
        <div :class="['chat-bubble', me ? 'chat-bubble-me' : '']">
          <div v-if="author || date" class="chat-bubble-title">
            <div class="row">
              <div v-if="author" class="col chat-bubble-author">{{ author }}</div>
              <div v-if="date" class="col-auto chat-bubble-date">{{ date }}</div>
            </div>
          </div>
          <div class="chat-bubble-body">
            <slot />
          </div>
        </div>
      </div>

      <!-- Right Avatar (if me) -->
      <div v-if="me && avatar" class="col-auto">
        <span class="avatar" :style="{ backgroundImage: `url(${avatar})` }"></span>
      </div>
    </div>
  </div>
</template>
