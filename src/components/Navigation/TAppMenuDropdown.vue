<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { IconLayoutGrid, IconSettings } from '@tabler/icons-vue'

interface AppItem {
  id: string | number
  name: string
  icon?: string
  link?: string
}

interface Props {
  apps?: AppItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'settings-click'): void
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
  <div class="nav-item dropdown d-none d-md-flex me-3">
    <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show app menu"
      data-bs-auto-close="outside">
      <IconLayoutGrid class="icon" />
    </a>
    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">My Apps</h3>
          <div class="card-actions btn-actions">
            <a href="#" class="btn-action" @click.prevent="emit('settings-click')">
              <IconSettings class="icon" />
            </a>
          </div>
        </div>
        <div class="card-body scroll-y p-2" style="max-height: 50vh">
          <div class="row g-0">
            <div v-for="app in apps" :key="app.id" class="col-4">
              <component
                :is="app.link && !isExternalLink(app.link) ? RouterLink : 'a'"
                :to="app.link"
                :href="app.link || '#'"
                class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable text-decoration-none">
                <img v-if="app.icon" :src="app.icon" class="w-6 h-6 mx-auto mb-2" width="24" height="24"
                  :alt="app.name" />
                <span class="h5 mb-0 text-truncate w-100">{{ app.name }}</span>
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-hoverable:hover {
  background-color: var(--tblr-bg-surface-secondary);
  border-radius: var(--tblr-border-radius);
}

.flex-center {
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
export default {
  name: 'TAppMenuDropdown'
}
</script>
