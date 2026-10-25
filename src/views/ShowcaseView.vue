<script setup lang="ts">
import { ref } from 'vue'
import {
  TButton,
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
  TRow,
  TTabs,
  TTab,
  TLayout,
  TPageHeader,
  TPageBody,
  TThemeSettings,
  TToast,
  TNumberInput,
  TStatus,
  TStatusDot,
  TBreadcrumb,
  TSegmentedControl,
  TDivider,
  TMockupBrowser,
  TSignal,
  TLegend,
  TLegendList,
  TSparkline,
  TShape,
  TFlag,
  TTextShimmer,
  TKbd,
  TKbdGroup,
  TOtpInput,
  TPasswordStrength,
  TClipboard,
  TCountUp,
  TConfetti,
  TTracking,
  TTrending,
  TMention,
  TChat,
  TChatBubble
} from '../components'
import {
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
const numberValue = ref(3)
const segmentedValue = ref('Daily')
const otpValue = ref('')
const passwordInput = ref('Secr3t123!')

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

        <!-- New Tabler Components Section -->
        <TCol :col="12">
          <TCard title="Tabler v1.7+ New Components">
            <TBreadcrumb :items="[
              { text: 'Home', href: '#' },
              { text: 'Components', href: '#' },
              { text: 'New in Tabler', active: true }
            ]" separator="arrows" class="mb-3" />

            <div class="row g-3">
              <!-- Number Input -->
              <div class="col-md-4">
                <label class="form-label">Number Input (Stepper)</label>
                <TNumberInput v-model="numberValue" :min="1" :max="10" :step="1" />
                <div class="form-text mt-1">Current value: {{ numberValue }}</div>
              </div>

              <!-- Segmented Control -->
              <div class="col-md-4">
                <label class="form-label">Segmented Control</label>
                <TSegmentedControl
                  v-model="segmentedValue"
                  :items="['Daily', 'Weekly', 'Monthly']"
                  full-width
                />
              </div>

              <!-- Signal & Shimmer -->
              <div class="col-md-4">
                <label class="form-label">Signal & Text Shimmer</label>
                <div class="d-flex align-items-center gap-3">
                  <TSignal :level="2" color="green" label="Online" />
                  <TSignal :level="3" :bars="4" color="orange" label="Warning" />
                  <TTextShimmer text="Generating reply…" loader color="primary" />
                </div>
              </div>
            </div>

            <TDivider text="Status, Legend & Sparklines" color="primary" class="my-4" />

            <div class="row g-3 align-items-center">
              <!-- Status & Status Dot -->
              <div class="col-md-4">
                <label class="form-label d-block">Status Badges & Dots</label>
                <div class="d-flex flex-wrap gap-2 align-items-center">
                  <TStatus color="green" dot animated label="Active" />
                  <TStatus color="orange" dot label="Pending" />
                  <TStatus color="red" lite label="Failed" />
                  <TStatusDot color="primary" animated />
                  <TStatusDot color="green" />
                </div>
              </div>

              <!-- Legends -->
              <div class="col-md-4">
                <label class="form-label d-block">Interactive Legends</label>
                <TLegendList>
                  <TLegend color="blue" label="Allowed" value="339.0k" interactive />
                  <TLegend color="red" label="Denied" value="1.2k" interactive />
                </TLegendList>
              </div>

              <!-- Sparklines & Flags & Shapes -->
              <div class="col-md-4">
                <label class="form-label d-block">Flags, Shapes & Sparklines</label>
                <div class="d-flex align-items-center gap-2">
                  <TFlag country="id" size="md" />
                  <TFlag country="us" size="md" />
                  <TShape color="primary" size="sm" circle>
                    <IconHome class="icon" />
                  </TShape>
                  <TSparkline :values="[3, 5, 2, 8, 6, 9, 7]" type="line" color="green" fill />
                </div>
              </div>
            </div>

            <TDivider text="Mockup Browser" class="my-4" />

            <TMockupBrowser url="https://tabler.io" secure>
              <div class="p-4 bg-body-tertiary text-center">
                <h4 class="mb-1">Mockup Browser Component</h4>
                <p class="text-secondary mb-0">Renders window controls and preview address frame.</p>
              </div>
            </TMockupBrowser>

            <TDivider text="OTP Input & Password Strength" class="my-4" />

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">OTP Verification Code (6 digits, grouped)</label>
                <div>
                  <TOtpInput v-model="otpValue" :length="6" :groups="[3, 3]" auto-focus />
                </div>
                <div class="text-secondary mt-1 fs-5">Entered: {{ otpValue || '—' }}</div>
              </div>

              <div class="col-md-6">
                <label class="form-label">Password Strength Meter</label>
                <input
                  v-model="passwordInput"
                  type="password"
                  class="form-control"
                  placeholder="Enter a password…"
                />
                <TPasswordStrength :password="passwordInput" />
              </div>
            </div>

            <TDivider text="Action & Feedback (Clipboard, CountUp, Confetti, Trending)" class="my-4" />

            <div class="row g-3 align-items-center">
              <div class="col-md-3">
                <label class="form-label d-block">Animated CountUp</label>
                <h2 class="mb-0 text-primary">
                  <TCountUp :to="28540" :duration="2.5" prefix="$" />
                </h2>
              </div>

              <div class="col-md-3">
                <label class="form-label d-block">Trend Indicator</label>
                <div class="d-flex align-items-center gap-3">
                  <TTrending :value="24.8" unit="%" direction="up" />
                  <TTrending :value="-3.2" unit="%" direction="down" />
                  <TTrending :value="0" unit="%" direction="neutral" />
                </div>
              </div>

              <div class="col-md-3">
                <label class="form-label d-block">Clipboard Copy</label>
                <TClipboard text="npm install @tabler/core" label="Copy Command" feedback="Copied!" variant="outline-primary" size="sm" />
              </div>

              <div class="col-md-3">
                <label class="form-label d-block">Confetti Shower</label>
                <TConfetti label="Celebrate!" variant="success" />
              </div>
            </div>

            <TDivider text="Uptime Tracking & Inline Mentions" class="my-4" />

            <div class="row g-3">
              <div class="col-md-7">
                <label class="form-label">System Uptime Activity (30 Days)</label>
                <TTracking
                  :items="[
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'warning', tooltip: 'Degraded Performance' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'danger', tooltip: 'Major Outage' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: '', tooltip: 'No data' },
                    { status: 'success', tooltip: '100% Operational' },
                    { status: 'success', tooltip: '100% Operational' },
                  ]"
                />
              </div>

              <div class="col-md-5">
                <label class="form-label">Inline Mentions & Shortcuts</label>
                <p class="mb-0">
                  Assigned to <TMention avatar="https://preview.tabler.io/static/avatars/000m.jpg">Paweł</TMention> via
                  <TMention app="https://tabler.io/favicons/favicon.ico">Tabler</TMention>. Press
                  <TKbdGroup>
                    <TKbd>⌘</TKbd>
                    <TKbd>K</TKbd>
                  </TKbdGroup> to search.
                </p>
              </div>
            </div>

            <TDivider text="Chat Conversation" class="my-4" />

            <TChat>
              <TChatBubble
                author="Alice Marlin"
                date="10:24"
                avatar="https://preview.tabler.io/static/avatars/002f.jpg"
              >
                <p class="mb-0">Hey, are you free for a quick review of the new Tabler components?</p>
              </TChatBubble>
              <TChatBubble
                author="You"
                date="10:25"
                avatar="https://preview.tabler.io/static/avatars/000m.jpg"
                me
              >
                <p class="mb-0">Yes, everything from the Tabler v1.5–1.7.1 changelog is now supported in vue3-tabler!</p>
              </TChatBubble>
            </TChat>
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
