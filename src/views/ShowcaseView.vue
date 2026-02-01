<script setup lang="ts">
import { ref } from 'vue'
import {
  TAlert,
  TButton,
  TBadge,
  TCard,
  TCarousel,
  TCol,
  TFormFieldset,
  TFormLabel,
  TInput,
  TInputMask,
  TCheckbox,
  TRadio,
  TDatePicker,
  TColorInput,
  TRange,
  TSelectAdvance,
  TWysiwyg,
  TDropzone,
  TStarRating,
  TDataTable,
  TChart,
  TModal,
  TOffcanvas,
  TPagination,
  TPlaceholder,
  TProgress,
  TRow,
  TSteps,
  TTabs,
  TTab,
  TTag,
  TLayout,
  TPageHeader,
  TPageBody,
  TToggleTheme,
  TThemeSettings,
  TToast,
  TSidebar
} from '../components'
import {
  IconCheck,
  IconAlertCircle,
  IconHome,
  IconPackage,
  IconBell,
  IconDotsVertical,
  IconHomeCog
} from '@tabler/icons-vue'

const showModal = ref(false)
const showOffcanvas = ref(false)
const showToast = ref(false)
const selectedTab = ref('home')
const progressValue = ref(38)
const currentPage = ref(1)
const inputValue = ref('')

// Basic Form states
const checkboxValue = ref(true)
const radioValue = ref('option1')
const switchValue = ref(true)

// New component states
const dateValue = ref('2024-12-15')
const colorValue = ref('#206bc4')
const rangeValue = ref(50)
const selectValue = ref(1)
const multiSelectValue = ref([1, 2])
const ratingValue = ref(4)
const wysiwygContent = ref('Hello <b>Tabler</b>!')

const tableItems = [
  { id: 1, name: 'Paweł Kuna', email: 'pawel@example.com', role: 'User' },
  { id: 2, name: 'Jeffie Lewzey', email: 'jeffie@example.com', role: 'Admin' },
  { id: 3, name: 'Mallory Hulme', email: 'mallory@example.com', role: 'User' },
  { id: 4, name: 'Dunn Hamrick', email: 'dunn@example.com', role: 'Staff' },
  { id: 5, name: 'Jovan Mesic', email: 'jovan@example.com', role: 'Admin' },
]

const tableFields = [
  { text: 'ID', value: 'id' },
  { text: 'NAME', value: 'name' },
  { text: 'EMAIL', value: 'email' },
  { text: 'ROLE', value: 'role' },
  { text: 'ACTIONS', value: 'actions' }
]

const chartSeries = [{
  name: 'Net Profit',
  data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
}]

const chartOptions = {
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  colors: ['#206bc4']
}

const navigationItems = [
  { title: 'Dashboard', href: '/dashboard', icon: IconHome },
  { title: 'Components', href: '/', icon: IconPackage, active: true },
  { title: 'Layouts', href: '/layouts', icon: IconHomeCog },
]

const carouselItems = [
  { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop', title: 'Nature', description: 'Beautiful mountain landscape.' },
  { image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=400&fit=crop', title: 'River', description: 'Peaceful river flowing through the woods.' },
  { image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop', title: 'Forest', description: 'Sunlight filtering through the trees.' },
]

const stepsItems = [
  { title: 'Personal Info', active: true },
  { title: 'Billing Address' },
  { title: 'Payment Method' },
  { title: 'Confirmation' }
]
</script>

<template>
  <TLayout :sidebar-items="navigationItems" brand-text="TablerVue">
    <template #navbar-right>
      <div class="nav-item d-none d-md-flex me-3">
        <TToggleTheme />
      </div>
    </template>

    <TPageHeader>
      <template #title>Tabler Component Showcase</template>
    </TPageHeader>

    <TPageBody>
      <div class="row row-cards">
        <!-- Basic Form Elements Section -->
        <TCol md="12">
          <TCard title="Basic Form Elements">
            <div class="row">
              <TCol md="4">
                <TFormLabel>Checkboxes (TCheckbox)</TFormLabel>
                <div class="mb-3">
                  <TCheckbox v-model="checkboxValue" label="I agree to the terms" />
                  <TCheckbox label="Option 2 (disabled)" disabled />
                  <TCheckbox label="With description" description="This is a subtext for the checkbox." />
                </div>
              </TCol>
              <TCol md="4">
                <TFormLabel>Radios (TRadio)</TFormLabel>
                <div class="mb-3">
                  <TRadio v-model="radioValue" value="option1" label="Option 1" />
                  <TRadio v-model="radioValue" value="option2" label="Option 2" />
                  <TRadio v-model="radioValue" value="option3" label="Option 3 (disabled)" disabled />
                </div>
              </TCol>
              <TCol md="4">
                <TFormLabel>Toggle Switches (TCheckbox toggle)</TFormLabel>
                <div class="mb-3">
                  <TCheckbox v-model="switchValue" label="Enable notifications" toggle />
                  <TCheckbox :model-value="false" label="Offline mode" toggle />
                  <TCheckbox :model-value="true" label="ReadOnly Switch" toggle disabled />
                </div>
              </TCol>
            </div>
          </TCard>
        </TCol>

        <!-- Advanced Form Elements Section -->
        <TCol md="12">
          <TCard title="Advanced Form Elements">
            <div class="row g-4">
              <TCol md="4">
                <TFormLabel>Date Picker (TDatePicker)</TFormLabel>
                <TDatePicker v-model="dateValue" placeholder="Select date..." />
              </TCol>
              <TCol md="4">
                <TFormLabel>Color Input (TColorInput)</TFormLabel>
                <TColorInput v-model="colorValue" />
              </TCol>
              <TCol md="4">
                <TFormLabel>Input Mask (TInputMask - Date)</TFormLabel>
                <TInputMask mask="00/00/0000" placeholder="DD/MM/YYYY" />
              </TCol>
              <TCol md="6">
                <TFormLabel>Range Slider (TRange: {{ rangeValue }})</TFormLabel>
                <TRange v-model="rangeValue" />
              </TCol>
              <TCol md="6">
                <TFormLabel>Star Rating (TStarRating)</TFormLabel>
                <div>
                  <TStarRating v-model="ratingValue" />
                </div>
              </TCol>
              <TCol md="6">
                <TFormLabel>Advanced Select (TSelectAdvance - Single with Avatar)</TFormLabel>
                <TSelectAdvance v-model="selectValue" :options="[
                  { label: 'Paweł Kuna', value: 1, avatar: 'https://preview.tabler.io/static/avatars/000m.jpg', description: 'UI Designer' },
                  { label: 'Jeffie Lewincamp', value: 2, avatar: 'https://preview.tabler.io/static/avatars/002m.jpg', description: 'Developer' }
                ]" />
              </TCol>
              <TCol md="6">
                <TFormLabel>Tags Input (TSelectAdvance - Multiple)</TFormLabel>
                <TSelectAdvance v-model="multiSelectValue" multiple :options="[
                  { label: 'Vue.js', value: 1 },
                  { label: 'React', value: 2 },
                  { label: 'Angular', value: 3 },
                  { label: 'Svelte', value: 4 }
                ]" />
              </TCol>
              <TCol md="12">
                <TFormLabel>Rich Text Editor (TWysiwyg)</TFormLabel>
                <TWysiwyg v-model="wysiwygContent" />
              </TCol>
              <TCol md="12">
                <TFormLabel>File Upload (TDropzone)</TFormLabel>
                <TDropzone message="Drag and drop your images here" description="Maximum file size 5MB" />
              </TCol>
            </div>
          </TCard>
        </TCol>

        <!-- Data & Visualization Section -->
        <TCol md="12">
          <TCard title="Data & Visualization">
            <TRow>
              <TCol md="8">
                <h5>Advanced Data Table (TDataTable)</h5>
                <TDataTable :headers="tableFields" :items="tableItems" :rows-per-page="5">
                  <template #item-actions>
                    <TButton variant="ghost-primary" icon size="sm">
                      <IconDotsVertical class="icon" />
                    </TButton>
                  </template>
                </TDataTable>
              </TCol>
              <TCol md="4">
                <h5>Apex Charts (TChart)</h5>
                <TChart type="bar" :series="chartSeries" :options="chartOptions" :height="300" />
              </TCol>
            </TRow>
          </TCard>
        </TCol>

        <!-- UI Elements -->
        <TCol md="6">
          <TCard title="Carousel (TCarousel)">
            <TCarousel :items="carouselItems" indicators controls fade />
          </TCard>
        </TCol>

        <TCol md="6">
          <TCard title="Tabs (TTabs & TTab)">
            <TTabs v-model="selectedTab">
              <TTab name="home" title="Home">
                <div class="p-3">Home tab content</div>
              </TTab>
              <TTab name="profile" title="Profile">
                <div class="p-3">Profile tab content</div>
              </TTab>
              <TTab name="settings" title="Settings" disabled>
                <div class="p-3">Settings tab content</div>
              </TTab>
            </TTabs>
          </TCard>
        </TCol>

        <!-- Overlays Section -->
        <TCol md="12">
          <TCard title="Overlays (Modal, Offcanvas, Toast)">
            <div class="btn-list">
              <TButton variant="primary" @click="showModal = true">Open Modal</TButton>
              <TButton variant="secondary" @click="showOffcanvas = true">Open Offcanvas</TButton>
              <TButton variant="info" @click="showToast = true">Show Toast</TButton>
            </div>

            <TModal v-model="showModal" title="Example Modal" status="primary">
              <p>This is a reusable modal component.</p>
              <template #footer>
                <TButton variant="secondary" @click="showModal = false">Close</TButton>
                <TButton variant="primary" @click="showModal = false">Save</TButton>
              </template>
            </TModal>

            <TOffcanvas v-model="showOffcanvas" title="Settings Panel" placement="end" backdrop>
              <div class="p-3">
                <p>Configure your dashboard settings here.</p>
                <TFormFieldset>
                  <TFormLabel>Username</TFormLabel>
                  <TInput v-model="inputValue" placeholder="Enter username" />
                </TFormFieldset>
              </div>
            </TOffcanvas>
          </TCard>
        </TCol>
      </div>
    </TPageBody>

    <!-- Global Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <TToast v-model="showToast" variant="primary" title="Notification">
        <template #icon>
          <IconBell class="icon" />
        </template>
        You have a new message!
      </TToast>
    </div>
    <TThemeSettings />
  </TLayout>
</template>

<script lang="ts">
export default {
  name: 'ShowcaseView'
}
</script>
