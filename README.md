# Vue3 Tabler

[![npm version](https://badge.fury.io/js/vue3-tabler.svg)](https://www.npmjs.com/package/vue3-tabler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A premium administrative dashboard component library for Vue 3, based on [Tabler UI](https://tabler.io/). This project provides a set of highly customizable Vue components that follow Tabler's design system and best practices.

## 🚀 Getting Started

### Installation

Install the package via npm:

```bash
npm install vue3-tabler
```

Make sure you also have the peer dependencies installed:

```bash
npm install @tabler/core @tabler/icons-vue vue-router pinia
```

### Basic Usage

#### Option 1: Import Components Individually

```vue
<script setup>
import { TLayout, TCard, TButton } from 'vue3-tabler'
</script>

<template>
  <TLayout type="vertical">
    <TCard title="Welcome">
      <p>This is a Tabler Vue component!</p>
      <TButton variant="primary">Click Me</TButton>
    </TCard>
  </TLayout>
</template>
```

#### Option 2: Register Components Globally

```javascript
// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Vue3Tabler from 'vue3-tabler'

const app = createApp(App)
app.use(Vue3Tabler)
app.mount('#app')
```

Then use components without importing:

```vue
<template>
  <TLayout type="vertical">
    <TCard title="Welcome">
      <p>No import needed!</p>
      <TButton variant="primary">Click Me</TButton>
    </TCard>
  </TLayout>
</template>
```

---

## 🏗️ Components Documentation

### 1. Layout & Structure

#### `TLayout`
The main wrapper component that manages different Tabler layout types.

| Prop                        | Type      | Default      | Description                                                                      |
| --------------------------- | --------- | ------------ | -------------------------------------------------------------------------------- |
| `type`                      | `String`  | `'vertical'` | Layout style: `vertical`, `horizontal`, `fluid`, `combo`, `navbar-overlap`, etc. |
| `sidebar-items`             | `Array`   | `[]`         | Navigation items for the sidebar.                                                |
| `v-model:sidebar-collapsed` | `Boolean` | `false`      | Controls the mini/collapsed state of the sidebar.                                |

**Example:**
```vue
<TLayout 
  type="vertical" 
  v-model:sidebar-collapsed="isCollapsed"
  :sidebar-items="navItems"
  brand-text="My App"
>
  <router-view />
</TLayout>
```

---

### 2. Navigation

#### `TSidebar`
The vertical navigation component with collapse support.

#### `TNavbar`
The horizontal top navigation bar.

#### `TNotificationDropdown`
A ready-to-use notification menu for the navbar.

**Example:**
```vue
<TNotificationDropdown 
  :notifications="items" 
  :unread-count="5" 
  @archive="handleArchive" 
/>
```

#### `TAppMenuDropdown`
A grid-based menu typically used for "Apps" or shortcuts.

---

### 3. Data Display

#### `TCard`
Versatile container for content.

| Prop       | Type     | Default     | Description           |
| ---------- | -------- | ----------- | --------------------- |
| `title`    | `String` | `undefined` | Card header title.    |
| `subtitle` | `String` | `undefined` | Card header subtitle. |

#### `TTable`
A styled Tabler table component.

#### `TBadge`
Small status indicators. Supports `pulse` animation.

**Example:**
```vue
<TBadge variant="success" pulse>Active</TBadge>
<TBadge variant="danger">Offline</TBadge>
```

---

### 4. Forms

Full support for Tabler-styled form elements:

- `TInput`: Standard text, email, password inputs.
- `TSelect`: Custom styled select dropdowns.
- `TCheckbox` & `TRadio`: Styled selection controls.
- `TFormFieldset`: Grouped form fields.

**Example:**
```vue
<TFormFieldset label="Account Information">
  <TFormLabel>Email Address</TFormLabel>
  <TInput type="email" placeholder="enter email" />
</TFormFieldset>
```

---

### 5. UI Elements & Feedback

- `TButton`: Supports all Tabler variants (`primary`, `success`, `ghost-secondary`, etc).
- `TAlert`: Styled alert boxes with icons.
- `TModal`: Responsive dialog windows.
- `TProgress`: Linear progress bars.
- `TSteps`: Multi-step process indicators.

---

## 📦 Available Components

Below is the complete list of components currently available in the library:

- **Layout**: `TLayout`, `TPage`, `TPageWrapper`, `TPageHeader`, `TPageBody`, `TFooter`, `TEmptyState`, `TDataGrid`, `TPageLoader`
- **Navigation**: `TSidebar`, `TNavbar`, `TNotificationDropdown`, `TAppMenuDropdown`, `TPagination`, `TTabs`, `TTab`
- **Forms**: `TInput`, `TSelect`, `TCheckbox`, `TRadio`, `TTextarea`, `TFormLabel`, `TFormFieldset`, `TFormGroup`, `TDatePicker`, `TColorInput`, `TFormSelectGroup`, `TFormSelectGroupItem`, `TInputMask`, `TRange`, `TSelectAdvance`, `TWysiwyg`, `TDropzone`, `TStarRating`
- **Data Display**: `TCard`, `TRibbon`, `TTable`, `TDataTable`, `TChart`, `TBadge`, `TTag`, `TAvatar`, `TPlaceholder`, `TProgress`, `TSteps`, `TStatsCard`, `TActivityList`, `TActivityItem`, `TPricingCard`, `TInvoice`
- **UI Elements**: `TButton`, `TAccordion`, `TAccordionItem`, `TAlert`, `TCarousel`, `TDropdown`, `TDropdownItem`, `TDropdownDivider`, `TDropdownHeader`
- **Overlays**: `TModal`, `TOffcanvas`, `TToast`, `TAlert`
- **Grid**: `TRow`, `TCol`
- **Theme**: `TToggleTheme`, `TThemeSettings`

---

## 🎨 Theme & Customization

The components support Tabler's built-in themes:

- **Dark Mode**: Add `data-bs-theme="dark"` to any parent element or use the `dark` prop in navigation components.
- **RTL Support**: Handled automatically when `type="rtl"` is set on `TLayout`.

## Credits

- **Tabler Authors**: [tabler.io](https://tabler.io/)
- **Tabler Icons**: [tabler-icons.io](https://tabler-icons.io/)
- **Vue3 Easy Data Table**: [vue3-easy-data-table](https://github.com/Lin-Bu/vue3-easy-data-table)
- **Vue3 ApexCharts**: [vue3-apexcharts](https://github.com/vue-apexcharts/vue3-apexcharts)

---
