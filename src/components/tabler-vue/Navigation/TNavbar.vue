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
  fluid?: boolean
  dark?: boolean
  overlap?: boolean
  condensed?: boolean
  brandHref?: string
  brandImage?: string
  brandText?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  fluid: false,
  dark: false,
  overlap: false,
  condensed: false,
  brandHref: '/',
  brandText: ''
})

const navbarClasses = computed(() => {
  return {
    'navbar': true,
    'navbar-expand-md': true,
    'd-print-none': true,
    'navbar-overlap': props.overlap,
    'navbar-condensed': props.condensed
  }
})

const containerClass = computed(() => props.fluid ? 'container-fluid' : 'container-xl')
</script>

<template>
  <header :class="navbarClasses" :data-bs-theme="dark ? 'dark' : undefined">
    <div :class="containerClass">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
        aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <h1 v-if="brandText || brandImage"
        class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a :href="brandHref">
          <img v-if="brandImage" :src="brandImage" :alt="brandText" class="navbar-brand-image" />
          <span v-else>{{ brandText }}</span>
        </a>
      </h1>

      <div class="navbar-nav flex-row order-md-last">
        <slot name="right" />
      </div>

      <div class="collapse navbar-collapse" id="navbar-menu">
        <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
          <ul class="navbar-nav">
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
                  <span v-if="item.badge" :class="`badge badge-sm bg-${item.badge.variant} ms-auto`"
                    class="text-uppercase">
                    {{ item.badge.text }}
                  </span>
                </a>
              </li>

              <!-- Dropdown -->
              <li v-else class="nav-item dropdown" :class="{ active: item.active }">
                <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown"
                  data-bs-auto-close="outside" role="button" aria-expanded="false">
                  <span v-if="item.icon" class="nav-link-icon d-md-none d-lg-inline-block">
                    <component :is="item.icon" class="icon" />
                  </span>
                  <span class="nav-link-title">
                    {{ item.title }}
                  </span>
                </a>
                <div class="dropdown-menu">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <template v-for="(child, cIdx) in item.children" :key="cIdx">
                        <!-- Nested Dropdown (Dropend) -->
                        <div v-if="child.children" class="dropend">
                          <a class="dropdown-item dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown"
                            data-bs-auto-close="outside" role="button" aria-expanded="false">
                            {{ child.title }}
                          </a>
                          <div class="dropdown-menu">
                            <a v-for="(subChild, scIdx) in child.children" :key="scIdx"
                              :href="subChild.href || 'javascript:void(0)'" class="dropdown-item"
                              :class="{ active: subChild.active }">
                              {{ subChild.title }}
                            </a>
                          </div>
                        </div>

                        <!-- Standard Item -->
                        <a v-else class="dropdown-item" :class="{ active: child.active }"
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
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'TNavbar'
}
</script>
