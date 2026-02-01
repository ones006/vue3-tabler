<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { IconBell, IconStar } from '@tabler/icons-vue'

interface NotificationItem {
  id: string | number
  title: string
  description: string
  time?: string
  status?: 'red' | 'green' | 'blue' | 'yellow' | 'azure' | 'purple' | 'pink' | 'orange' | 'teal' | 'gray'
  animated?: boolean
  link?: string
  starred?: boolean
}

interface Props {
  notifications?: NotificationItem[]
  unreadCount?: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'archive'): void
  (e: 'mark-read'): void
  (e: 'item-click', item: NotificationItem): void
  (e: 'star-click', item: NotificationItem): void
}>()

const isExternalLink = (href: string) => {
  try {
    const url = new URL(href, window.location.origin)
    return url.origin !== window.location.origin
  } catch {
    // If URL parsing fails, treat as relative/internal
    return false
  }
}
</script>

<template>
  <div class="nav-item dropdown d-none d-md-flex">
    <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications"
      data-bs-auto-close="outside">
      <IconBell class="icon" />
      <span v-if="unreadCount" class="badge bg-red">{{ unreadCount }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Notifications</h3>
        </div>
        <div class="list-group list-group-flush list-group-hoverable">
          <div v-for="item in notifications" :key="item.id" class="list-group-item">
            <div class="row align-items-center">
              <div v-if="item.status" class="col-auto">
                <span class="status-dot"
                  :class="[`bg-${item.status}`, { 'status-dot-animated': item.animated }]"></span>
              </div>
              <div class="col text-truncate">
                <component
                  :is="item.link && !isExternalLink(item.link) ? RouterLink : 'a'"
                  :to="item.link"
                  :href="item.link || '#'"
                  class="text-body d-block"
                  @click.prevent="emit('item-click', item)">
                  {{ item.title }}
                </component>
                <div class="d-block text-secondary text-truncate mt-n1">
                  {{ item.description }}
                </div>
              </div>
              <div class="col-auto">
                <a href="#" class="list-group-item-actions" :class="{ show: item.starred }"
                  @click.prevent="emit('star-click', item)">
                  <IconStar class="icon" :class="{ 'text-yellow': item.starred, 'text-muted': !item.starred }" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col">
              <a href="#" class="btn w-100" @click.prevent="emit('archive')">
                Archive all
              </a>
            </div>
            <div class="col">
              <a href="#" class="btn w-100" @click.prevent="emit('mark-read')">
                Mark all as read
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TNotificationDropdown'
}
</script>
