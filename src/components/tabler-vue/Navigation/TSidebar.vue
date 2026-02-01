<script setup lang="ts">
import { computed } from 'vue'

interface MenuItem {
  title: string
  href?: string
  icon?: any
  active?: boolean
  badge?: {
    text: string
    variant: string
  }
  children?: MenuItem[]
}

interface Props {
  items?: MenuItem[]
  collapsed?: boolean
  dark?: boolean
  brandHref?: string
  brandImage?: string
  brandText?: string
  placement?: 'start' | 'end'
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  collapsed: false,
  dark: false,
  brandHref: '/',
  brandText: 'Tabler',
  placement: 'start',
  transparent: false
})

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const sidebarClasses = computed(() => {
  return {
    'navbar': true,
    'navbar-vertical': true,
    'navbar-expand-lg': true,
    'navbar-vertical-narrow': props.collapsed,
    'navbar-right': props.placement === 'end',
    'navbar-transparent': props.transparent
  }
})

const sidebarTheme = computed(() => props.dark ? 'dark' : undefined)

const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<template>
  <aside :class="sidebarClasses" :data-bs-theme="sidebarTheme">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu"
        aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="sidebar-header d-flex align-items-center w-100">
        <h1 class="navbar-brand navbar-brand-autodark mb-0">
          <a :href="brandHref">
            <template v-if="!collapsed">
              <img v-if="brandImage" :src="brandImage" :alt="brandText" class="navbar-brand-image" />
              <span v-else>{{ brandText }}</span>
            </template>
            <template v-else>
              <img v-if="brandImage" :src="brandImage" :alt="brandText" class="navbar-brand-image" />
              <span v-else>{{ brandText.charAt(0) }}</span>
            </template>
          </a>
        </h1>

        <!-- Toggle Button (Desktop only) -->
        <button class="btn btn-primary btn-icon d-none d-lg-flex sidebar-toggle" @click="toggleCollapsed"
          :title="collapsed ? 'Expand' : 'Collapse'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler-chevron-left" :style="{ transform: collapsed ? 'rotate(180deg)' : 'none' }">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </button>
      </div>

      <div class="navbar-nav flex-row d-lg-none">
        <slot name="mobile-nav" />
      </div>

      <div class="collapse navbar-collapse" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <template v-for="(item, index) in items" :key="index">
            <!-- Simple Link -->
            <li v-if="!item.children" class="nav-item" :class="{ active: item.active }">
              <a class="nav-link" :href="item.href || 'javascript:void(0)'">
                <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block">
                  <component :is="item.icon" class="icon" />
                </span>
                <span class="nav-link-title">
                  {{ item.title }}
                </span>
                <span v-if="item.badge && !collapsed" :class="`badge badge-sm bg-${item.badge.variant} ms-auto`"
                  class="text-uppercase">
                  {{ item.badge.text }}
                </span>
              </a>
            </li>

            <!-- Dropdown -->
            <li v-else class="nav-item dropdown" :class="{ active: item.active }">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown"
                data-bs-auto-close="false" role="button" aria-expanded="false">
                <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block">
                  <component :is="item.icon" class="icon" />
                </span>
                <span class="nav-link-title">
                  {{ item.title }}
                </span>
              </a>
              <div class="dropdown-menu" :class="{ show: item.active }">
                <div class="dropdown-menu-columns">
                  <div class="dropdown-menu-column">
                    <template v-for="(child, cIdx) in item.children" :key="cIdx">
                      <a class="dropdown-item" :class="{ active: child.active }"
                        :href="child.href || 'javascript:void(0)'">
                        {{ child.title }}
                        <span v-if="child.badge" :class="`badge badge-sm bg-${child.badge.variant} ms-auto`"
                          class="text-uppercase">
                          {{ child.badge.text }}
                        </span>
                      </a>
                    </template>
                  </div>
                </div>
              </div>
            </li>
          </template>
          <slot />
        </ul>
      </div>

    </div>
  </aside>
</template>

<style scoped>
/* Base transition for smooth collapse */
aside.navbar-vertical {
  transition: width 0.3s ease, margin-left 0.3s ease;
  overflow: visible !important;
  /* Allow toggle to float outside */
}

aside.navbar-vertical .container-fluid {
  overflow: visible !important;
}

.sidebar-header {
  position: relative;
  /* Anchor for absolute toggle */
  padding: 0.5rem 0.5rem;
}

/* Force narrow width if Tabler's CSS isn't applied correctly */
.navbar-vertical-narrow {
  width: 5rem !important;
}

.navbar-vertical-narrow .nav-link-title,
.navbar-vertical-narrow .badge {
  display: none !important;
}

/* Center icons in narrow mode */
.navbar-vertical-narrow .nav-link {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.navbar-vertical-narrow .nav-link-icon {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

/* Adjust brand for narrow state */
.navbar-vertical-narrow .navbar-brand {
  padding-left: 0;
  padding-right: 0;
  margin-right: 0;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.navbar-vertical-narrow .navbar-brand-image {
  max-height: 24px;
}

.navbar-vertical-narrow .sidebar-header {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
}

/* Float the toggle button on the edge */
.sidebar-toggle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) !important;
  right: -14px;
  /* Center of button on the border */
  z-index: 1000;
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  flex-shrink: 0 !important;
  padding: 0 !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--tblr-border-color);
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.sidebar-toggle .icon {
  width: 16px !important;
  height: 16px !important;
  margin: 0 !important;
}

/* In narrow mode, keep it positioned relative to the narrow width */
.navbar-vertical-narrow .sidebar-toggle {
  top: 1.5rem;
  transform: none !important;
}

/* Adjust brand to not overlap with toggle when expanded */
.navbar-brand {
  padding-right: 1.5rem !important;
}

.navbar-vertical-narrow .navbar-brand {
  padding-right: 0 !important;
}
</style>

<script lang="ts">
export default {
  name: 'TSidebar'
}
</script>
