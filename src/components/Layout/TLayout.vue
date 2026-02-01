<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import TPage from './TPage.vue'
import TPageWrapper from './TPageWrapper.vue'
import TNavbar from '../Navigation/TNavbar.vue'
import TSidebar from '../Navigation/TSidebar.vue'
import TFooter from './TFooter.vue'

interface Props {
  type?:
  | 'default'
  | 'boxed'
  | 'combo'
  | 'condensed'
  | 'fluid'
  | 'vertical-fluid'
  | 'horizontal'
  | 'navbar-dark'
  | 'navbar-overlap'
  | 'navbar-sticky'
  | 'rtl'
  | 'vertical-right'
  | 'vertical-transparent'
  | 'vertical'
  sidebarItems?: any[]
  navbarItems?: any[]
  brandText?: string
  brandImage?: string
  footerFluid?: boolean
  sidebarCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'vertical',
  brandText: 'Tabler',
  footerFluid: false,
  sidebarCollapsed: false
})

const emit = defineEmits<{
  (e: 'update:sidebarCollapsed', value: boolean): void
}>()

const isVertical = computed(() =>
  ['vertical', 'vertical-right', 'vertical-transparent', 'vertical-fluid', 'default'].includes(props.type)
)

const isHorizontal = computed(() =>
  ['horizontal', 'fluid', 'navbar-dark', 'navbar-overlap', 'navbar-sticky', 'condensed', 'combo'].includes(props.type)
)

const isBoxed = computed(() => props.type === 'boxed')
const isCondensed = computed(() => props.type === 'condensed')
const isNavbarDark = computed(() => props.type === 'navbar-dark')
const isNavbarOverlap = computed(() => props.type === 'navbar-overlap')
const isNavbarSticky = computed(() => props.type === 'navbar-sticky')
const isVerticalRight = computed(() => props.type === 'vertical-right')
const isVerticalTransparent = computed(() => props.type === 'vertical-transparent')
const isFluid = computed(() => ['fluid', 'vertical-fluid'].includes(props.type))

const updateBodyClasses = () => {
  const body = document.body
  // Clear layout classes
  body.classList.remove('layout-boxed', 'layout-fluid', 'navbar-overlap', 'navbar-sticky')

  if (isBoxed.value) body.classList.add('layout-boxed')
  if (isFluid.value) body.classList.add('layout-fluid')
  if (isNavbarSticky.value) body.classList.add('navbar-sticky')

  // RTL Support
  if (props.type === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    document.documentElement.removeAttribute('dir')
  }
}

watch(() => props.type, updateBodyClasses)
onMounted(updateBodyClasses)
</script>

<template>
  <TPage>
    <!-- Sidebar for Vertical-based layouts -->
    <TSidebar v-if="isVertical" :items="sidebarItems" :brand-text="brandText" :brand-image="brandImage"
      :placement="isVerticalRight ? 'end' : 'start'" :transparent="isVerticalTransparent"
      :dark="['vertical', 'vertical-right', 'fluid', 'combo'].includes(type) && !isVerticalTransparent"
      :collapsed="sidebarCollapsed" @update:collapsed="emit('update:sidebarCollapsed', $event)" />

    <!-- Header for Horizontal-based layouts -->
    <TNavbar v-if="isHorizontal" :items="navbarItems || sidebarItems" :brand-text="brandText" :brand-image="brandImage"
      :dark="isNavbarDark || isNavbarOverlap" :condensed="isCondensed" :overlap="isNavbarOverlap">
      <template #right>
        <slot name="navbar-right" />
      </template>
    </TNavbar>

    <!-- Header for Vertical-based layouts (Top Bar) -->
    <header v-if="isVertical" class="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div class="container-xl">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
          aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav flex-row order-md-last">
          <slot name="navbar-right" />
        </div>
        <div class="collapse navbar-collapse" id="navbar-menu">
          <!-- Placeholder for potential top-bar search/navigation -->
        </div>
      </div>
    </header>

    <TPageWrapper>
      <slot />
      <TFooter :fluid="footerFluid || type === 'fluid'">
        <template #links>
          <slot name="footer-links" />
        </template>
        <template #copyright>
          <slot name="footer-copyright" />
        </template>
      </TFooter>
    </TPageWrapper>
  </TPage>
</template>

<style scoped>
/* Adjust page wrapper margin when sidebar is narrow */
:deep(.navbar-vertical-narrow + .page-wrapper) {
  margin-left: 5rem;
}

/* Ensure smooth transition for the content area */
:deep(.page-wrapper) {
  transition: margin-left 0.3s ease;
}

/* Handle right-side vertical sidebar if needed */
:deep(.navbar-right.navbar-vertical-narrow + .page-wrapper) {
  margin-left: 0;
  margin-right: 5rem;
}
</style>

<script lang="ts">
export default {
  name: 'TLayout'
}
</script>
