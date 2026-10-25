# Vue3 Tabler

[![npm version](https://badge.fury.io/js/vue3-tabler.svg)](https://www.npmjs.com/package/vue3-tabler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tabler Core](https://img.shields.io/badge/tabler--core-v1.7.1-blue.svg)](https://tabler.io)
[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

A premium, enterprise-ready administrative dashboard component library for **Vue 3**, powered by [Tabler UI](https://tabler.io/). This library provides **100+ fully typed, accessible, and customizable Vue 3 components** adhering to Tabler's latest design system standards (v1.5.0 through v1.7.1).

---

## ✨ Features & Highlights

- ⚡ **100+ High Quality Components**: From everyday form controls to complex interactive widgets (OTP inputs, password meters, inline SVG sparklines, status tracking bars, vector maps, confetti, and chat bubbles).
- 🎨 **Tabler v1.5 – v1.7.1 Ready**:
  - **Folded Sidebar**: Narrow icon strip with hover preview (`navbar-folded` & `navbar-folded-hover`), section headers (`nav-section-title`), and pinned footer (`navbar-footer`).
  - **Modern Palette & Theming**: Native `oklch()` color mixing, `neutral` gray scale, system font stack (no web fonts required), and automatic dark mode (`prefers-color-scheme`).
  - **Card Gradients & Background Patterns**: Rich visual accents with `.card-gradient-*` and `.bg-pattern-*` utilities.
  - **Modern Datepicker**: Native calendar component built on Vanilla Calendar Pro (Litepicker fully deprecated).
- 🔗 **Universal Routing**: Seamless first-class support for **Inertia.js** (`Link`), **Vue Router** (`RouterLink`), or native anchors.
- 📦 **Tree-Shakable & Typed**: Ships full TypeScript definitions with tree-shaking support for minimal bundle impact.
- ♿ **Accessible**: ARIA attributes, keyboard navigation, and focus rings conforming to WCAG standards.

---

## 🚀 Getting Started

### Installation

Install the package via npm, pnpm, or yarn:

```bash
npm install @ones006/vue3-tabler
```

Install peer dependencies:

```bash
npm install @tabler/core @tabler/icons-vue vue-router pinia
```

### Setup

Import Tabler styles in your application entry file (e.g., `main.ts` or `app.js`):

```typescript
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
// Optional: Tabler flags, payments, or themes
import '@tabler/core/dist/css/tabler-flags.min.css'
import '@tabler/core/dist/css/tabler-payments.min.css'
```

---

## 🛠️ Usage

### Option 1: Global Registration (Recommended for Rapid Prototyping)

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Vue3Tabler from '@ones006/vue3-tabler'

const app = createApp(App)
app.use(Vue3Tabler)
app.mount('#app')
```

Now all components are globally available with the `T` prefix:

```vue
<template>
  <TLayout type="vertical">
    <TCard title="Dashboard">
      <p>Welcome to Vue3 Tabler!</p>
      <TButton variant="primary">Click Me</TButton>
    </TCard>
  </TLayout>
</template>
```

### Option 2: Individual Imports (Tree-Shaking)

```vue
<script setup lang="ts">
import { TCard, TButton, TSparkline, TOtpInput } from '@ones006/vue3-tabler'
</script>

<template>
  <TCard title="Quick Action">
    <TOtpInput :length="6" />
    <TSparkline type="line" :data="[10, 20, 15, 30, 25, 40]" />
    <TButton variant="success">Submit</TButton>
  </TCard>
</template>
```

---

## 🔗 Inertia.js & Routing Integration

The library is completely router-agnostic. You can configure a global link component so that all navigation components (Sidebar, Breadcrumbs, Pagination, Tags, Dropdowns) use your preferred router without manual wrapping.

### Using with Inertia.js

```typescript
import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import Vue3Tabler from '@ones006/vue3-tabler'

createInertiaApp({
  resolve: name => /* ... */,
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Vue3Tabler, { linkComponent: Link })
      .mount(el)
  },
})
```

### Using with Vue Router

```typescript
import { createApp } from 'vue'
import { RouterLink } from 'vue-router'
import Vue3Tabler from '@ones006/vue3-tabler'

const app = createApp(App)
app.use(Vue3Tabler, { linkComponent: RouterLink })
```

### Per-Component Link Override

```vue
<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <TBreadcrumbItem href="/dashboard" :link-component="Link">
    Dashboard
  </TBreadcrumbItem>
</template>
```

---

## 🧩 Component Spotlights

### 1. Form & Advanced Inputs

#### `TOtpInput`
Modern verification code input with grouped character slots, auto-focus jumping, clipboard pasting, and masking.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const otp = ref('')
</script>

<template>
  <TOtpInput 
    v-model="otp" 
    :length="6" 
    :group-size="3" 
    placeholder="○"
    @complete="val => console.log('OTP Entered:', val)" 
  />
</template>
```

#### `TPasswordStrength`
Segmented password meter with real-time score assessment following Tabler design rules.

```vue
<template>
  <TInput v-model="password" type="password" placeholder="Enter password" />
  <TPasswordStrength :password="password" show-text />
</template>
```

#### `TNumberInput`
Enhanced numeric stepper with bounds checking, step precision, and mouse-hold auto-repeat.

```vue
<template>
  <TNumberInput v-model="quantity" :min="1" :max="100" :step="1" />
</template>
```

#### `TDatePicker`
Tabler v1.6+ native datepicker (Vanilla Calendar Pro) replacing legacy Litepicker.

```vue
<template>
  <TDatePicker v-model="selectedDate" range week-numbers />
</template>
```

---

### 2. Actions & Micro-Interactions

#### `TClipboard`
One-click copy button with instant animated feedback states.

```vue
<template>
  <TClipboard text="npm install @ones006/vue3-tabler" variant="outline-primary">
    Copy Command
  </TClipboard>
</template>
```

#### `TConfetti`
Full-page or element celebration confetti burst using Tabler theme palette.

```vue
<template>
  <TConfetti :count="100">
    <TButton variant="success">Complete Order 🎉</TButton>
  </TConfetti>
</template>
```

#### `TButton`
Comprehensive button with size `xl`, `ghost` styles (`btn-ghost`), loading spinners, and icon slots.

```vue
<template>
  <TButton variant="primary" size="xl">Large Action</TButton>
  <TButton ghost variant="danger">Ghost Button</TButton>
  <TButton :loading="isLoading">Processing</TButton>
</template>
```

---

### 3. Data Visualization & Metrics

#### `TSparkline`
Dependency-free, lightweight SVG inline trend charts (`line`, `bar`, `circle`, `tristate`).

```vue
<template>
  <TSparkline type="line" :data="[4, 8, 5, 10, 12, 16, 14, 18]" color="blue" />
  <TSparkline type="bar" :data="[5, -2, 6, 8, -4, 9]" color="success" />
</template>
```

#### `TTracking` & `TTrackingBlock`
Uptime and status monitoring strip for infrastructure or SLA visibility.

```vue
<template>
  <TTracking>
    <TTrackingBlock 
      v-for="day in 60" 
      :key="day" 
      :status="day === 45 ? 'warning' : 'success'" 
      :tooltip="`Day ${day}: 100% operational`" 
    />
  </TTracking>
</template>
```

#### `TLegend`, `TLegendList` & `TLegendDot`
Chart & metric series legend with interactive toggles and large unit displays (`.legend-lg`).

```vue
<template>
  <TLegendList divided>
    <TLegend label="Direct" value="4,215" color="primary" />
    <TLegend label="Referral" value="1,830" color="green" />
    <TLegend label="Social" value="842" color="yellow" />
  </TLegendList>
</template>
```

#### `TTrending` & `TSignal`
Inline percentage change indicators (`arrow-up`/`arrow-down`) and stepped signal bars.

```vue
<template>
  <TTrending :value="12.5" />
  <TTrending :value="-3.4" />
  <TSignal :level="4" :max="5" color="success" />
</template>
```

#### `TVectorMap`
SVG vector world map supporting custom marker points and region coloring via jsVectorMap.

```vue
<template>
  <TVectorMap :values="{ US: 120, ID: 450, DE: 85 }" height="320px" />
</template>
```

---

### 4. Layout & Navigation

#### `TSidebar` (Tabler 1.5+ Folded Sidebar)
Vertical navigation with narrow folding, flyout menus, group section titles, and a pinned footer.

```vue
<template>
  <TSidebar 
    v-model:collapsed="isCollapsed" 
    :folded-hover="true"
    :items="[
      { title: 'MAIN', section: true },
      { title: 'Dashboard', href: '/dashboard', icon: IconHome },
      { title: 'Analytics', href: '/analytics', icon: IconChartBar },
      { title: 'ADMIN', section: true },
      { title: 'Settings', href: '/settings', icon: IconSettings }
    ]"
  >
    <template #footer>
      <div class="user-profile">
        <span>Logged in as Admin</span>
      </div>
    </template>
  </TSidebar>
</template>
```

#### `TCard` (Gradient & Background Pattern)

```vue
<template>
  <!-- Gradient Card -->
  <TCard gradient="primary" text-color="white" title="Premium Membership">
    Explore all features without limits.
  </TCard>

  <!-- Pattern Card -->
  <TCard pattern="dots" pattern-opacity="10" title="System Log">
    Background subtle pattern applied.
  </TCard>
</template>
```

---

### 5. Social, Communication & UI Elements

#### `TChat` & `TChatBubble`
Message stream component with sender styling, timestamps, and avatar integration.

```vue
<template>
  <TChat>
    <TChatBubble 
      avatar="/avatars/001m.jpg" 
      author="Alexander" 
      time="10:45 AM"
    >
      Hello! The new Tabler update is live.
    </TChatBubble>
    <TChatBubble 
      is-me 
      time="10:46 AM"
    >
      Great work! The new components look amazing.
    </TChatBubble>
  </TChat>
</template>
```

#### `TMention`, `TKbd`, `TFlag` & `TMockupBrowser`

```vue
<template>
  <!-- Mention chip -->
  <TMention avatar="/avatars/002f.jpg">@sarah</TMention>

  <!-- Keyboard shortcut -->
  <TKbdGroup>
    <TKbd>Ctrl</TKbd>
    <TKbd>K</TKbd>
  </TKbdGroup>

  <!-- Country flag -->
  <TFlag country="id" size="md" />

  <!-- Browser window frame -->
  <TMockupBrowser url="https://example.com">
    <div class="p-4">App Preview Content</div>
  </TMockupBrowser>
</template>
```

---

## 📦 Complete Component Catalog (102 Components)

| Category | Components |
| :--- | :--- |
| **Layout & Structure** | `TLayout`, `TPage`, `TPageWrapper`, `TPageHeader`, `TPageBody`, `TFooter`, `TEmptyState`, `TDataGrid`, `TPageLoader`, `TDivider`, `TMockupBrowser`, `TListGroup`, `TListGroupItem` |
| **Navigation** | `TSidebar`, `TNavbar`, `TBreadcrumb`, `TBreadcrumbItem`, `TSegmentedControl`, `TNavOverflow`, `TNotificationDropdown`, `TAppMenuDropdown`, `TPagination`, `TTabs`, `TTab` |
| **Forms & Input** | `TInput`, `TNumberInput`, `TOtpInput`, `TPasswordStrength`, `TSelect`, `TCheckbox`, `TRadio`, `TTextarea`, `TFormLabel`, `TFormFieldset`, `TFormGroup`, `TDatePicker`, `TColorInput`, `TRange`, `TFormSelectGroup`, `TFormSelectGroupItem`, `TInputMask`, `TSelectAdvance`, `TWysiwyg`, `TDropzone`, `TStarRating` |
| **Visual & Metrics** | `TSparkline`, `TLegend`, `TLegendList`, `TLegendDot`, `TSignal`, `TTrending`, `TCountUp`, `TTracking`, `TTrackingBlock`, `TChat`, `TChatBubble`, `TMention`, `TVectorMap`, `TChart`, `TFlag`, `TShape`, `THoverGallery`, `TImageLabel`, `TIconList`, `TKbd`, `TKbdGroup`, `TTextShimmer`, `TPlaceholder` |
| **Buttons & Triggers** | `TButton`, `TClipboard`, `TConfetti` |
| **Badges & Status** | `TBadge`, `TTag`, `TStatus`, `TStatusDot`, `TRibbon`, `TAvatar` |
| **Data Presentation** | `TCard`, `TTable`, `TDataTable`, `TStatsCard`, `TActivityList`, `TActivityItem`, `TPricingCard`, `TInvoice` |
| **Feedback & Overlays** | `TModal`, `TOffcanvas`, `TToast`, `TAlert`, `TProgress`, `TSteps`, `TAccordion`, `TAccordionItem`, `TCarousel`, `TDropdown`, `TDropdownItem`, `TDropdownDivider`, `TDropdownHeader` |
| **Grid System** | `TRow`, `TCol` |
| **Theme & Settings** | `TToggleTheme`, `TThemeSettings` |

---

## 🎨 Theming & Customization

Vue3 Tabler supports all native Tabler configuration attributes on `<html>`:

- **Theme Mode**: `data-bs-theme="dark"`, `data-bs-theme="light"`, or `auto` (system `prefers-color-scheme`).
- **Base Color Palette**: `data-bs-theme-base="neutral"` (v1.6+ default) or `"gray"`.
- **Layout Sizing**: `data-bs-layout="fluid"`, `"boxed"`, or default.
- **Navbar Style**: `data-bs-navbar-style="floating"` for elevated navbar gaps.
- **Color Accent**: `data-bs-theme-primary="blue"`, `"mist"`, `"teal"`, etc.

The built-in `<TThemeSettings />` component provides a turnkey slide-over panel that allows users to adjust and persist these settings out of the box.

---

## 📄 License

This project is open-source and released under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🙏 Credits & Acknowledgements

- [Tabler UI](https://tabler.io/) — Paweł Kuna and contributors for the phenomenal UI kit.
- [Tabler Icons](https://tabler-icons.io/) — The extensive SVG icon collection.
- [Vanilla Calendar Pro](https://vanilla-calendar.pro/) — The clean, dependency-free calendar engine.
- [Vue 3](https://vuejs.org/) — The progressive JavaScript framework.
