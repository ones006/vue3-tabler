<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  TLayout,
  TPageHeader,
  TPageBody,
  TCard,
  TButton,
  TSelect,
  TFormLabel,
  TBadge,
  TAvatar,
  TNotificationDropdown,
  TAppMenuDropdown,
  TToggleTheme,
  TThemeSettings
} from '../components/tabler-vue'
import {
  IconHome,
  IconPackage,
  IconPlus,
  IconHomeCog
} from '@tabler/icons-vue'

const layoutType = ref<any>('vertical')
const sidebarCollapsed = ref(false)

const navigationItems = [
  { title: 'Dashboard', href: '/dashboard', icon: IconHome },
  { title: 'Components', href: '/', icon: IconPackage },
  { title: 'Layouts', href: '/layouts', icon: IconHome, active: true },
]

const layoutOptions = [
  { label: 'Vertical (Default)', value: 'vertical' },
  { label: 'Vertical Fluid', value: 'vertical-fluid' },
  { label: 'Vertical Right', value: 'vertical-right' },
  { label: 'Vertical Transparent', value: 'vertical-transparent' },
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Horizontal Fluid', value: 'fluid' },
  { label: 'Combo (Side + Top)', value: 'combo' },
  { label: 'Boxed', value: 'boxed' },
  { label: 'Condensed', value: 'condensed' },
  { label: 'Navbar Dark', value: 'navbar-dark' },
  { label: 'Navbar Overlap', value: 'navbar-overlap' },
  { label: 'Navbar Sticky', value: 'navbar-sticky' },
  { label: 'RTL Mode', value: 'rtl' },
]

const headerClasses = computed(() => {
  return {
    'text-white': layoutType.value === 'navbar-overlap'
  }
})

const mockNotifications = ref([
  { id: 1, title: 'Example 1', description: 'Change deprecated html tags to text decoration classes (#29604)', status: 'red', animated: true },
  { id: 2, title: 'Example 2', description: 'justify-content:between ⇒ justify-content:space-between (#29734)', starred: true },
  { id: 3, title: 'Example 3', description: 'Update change-version.js (#29736)' },
  { id: 4, title: 'Example 4', description: 'Regenerate package-lock.json (#29730)', status: 'green' },
])

const mockApps = [
  { id: 'amazon', name: 'Amazon', icon: 'https://img.logo.dev/amazon.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
  { id: 'android', name: 'Android', icon: 'https://img.logo.dev/android.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
  { id: 'apple', name: 'Apple', icon: 'https://img.logo.dev/apple.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
  { id: 'discord', name: 'Discord', icon: 'https://img.logo.dev/discord.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
  { id: 'figma', name: 'Figma', icon: 'https://img.logo.dev/figma.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
  { id: 'github', name: 'GitHub', icon: 'https://img.logo.dev/github.com?token=pk_mXfV-f_uR8u9B6vQ4g9Q9w' },
]
</script>

<template>
  <TLayout :type="layoutType" v-model:sidebar-collapsed="sidebarCollapsed" :sidebar-items="navigationItems"
    brand-text="TablerVue">
    <template #navbar-right>
      <div class="nav-item d-none d-md-flex me-3">
        <TToggleTheme />
      </div>
      <TNotificationDropdown :notifications="mockNotifications" :unread-count="1" />
      <TAppMenuDropdown :apps="mockApps" />
      <div class="nav-item dropdown">
        <a href="#" class="nav-link d-flex lh-1 text-reset p-0">
          <TAvatar size="sm" src="https://i.pravatar.cc/150?u=4" />
          <div class="d-none d-xl-block ps-2">
            <div>Paweł Kuna</div>
            <div class="mt-1 small text-secondary">UI Designer</div>
          </div>
        </a>
      </div>
    </template>

    <TPageHeader title="Layout Customization" :class="headerClasses">
      <template #actions>
        <TButton variant="primary">
          <IconPlus class="icon" />
          Create New
        </TButton>
      </template>
    </TPageHeader>

    <TPageBody>
      <div class="row row-cards">
        <div class="col-md-4">
          <TCard title="Switch Layout Type">
            <div class="mb-3">
              <TFormLabel>Selected Layout</TFormLabel>
              <TSelect v-model="layoutType" :options="layoutOptions" />
            </div>
            <div class="alert alert-info py-2">
              The layout changes the structure and body classes dynamically.
            </div>
          </TCard>
        </div>
        <div class="col-md-8">
          <TCard title="Layout Details">
            <div class="datagrid">
              <div class="datagrid-item">
                <div class="datagrid-title">Current Layout</div>
                <div class="datagrid-content">
                  <TBadge variant="primary" pulse>{{ layoutType }}</TBadge>
                </div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Responsive</div>
                <div class="datagrid-content">Fully Responsive</div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Sidebar State</div>
                <div class="datagrid-content">
                  <TBadge :variant="sidebarCollapsed ? 'warning' : 'success'">
                    {{ sidebarCollapsed ? 'Collapsed' : 'Expanded' }}
                  </TBadge>
                </div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Theme Support</div>
                <div class="datagrid-content">Light / Dark Compatible</div>
              </div>
            </div>
          </TCard>

          <TCard title="Content Area" class="mt-4">
            <p>This is the main content area of the <code>TLayout</code> component. It automatically handles the
              wrapper,
              sidebar, navbar, and footer alignment based on the <code>type</code> prop.</p>
            <div class="p-4 border border-dashed rounded text-center text-secondary">
              Main Slot Content Goes Here
            </div>
          </TCard>
        </div>
      </div>
    </TPageBody>

    <template #footer-links>
      <li class="list-inline-item"><a href="#" class="link-secondary">Documentation</a></li>
      <li class="list-inline-item"><a href="#" class="link-secondary">License</a></li>
    </template>
    <TThemeSettings />
  </TLayout>
</template>
