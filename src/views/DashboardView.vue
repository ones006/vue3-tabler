<script setup lang="ts">
import {
  TLayout,
  TPageHeader,
  TPageBody,
  TRow,
  TCol,
  TCard,
  TStatsCard,
  TDataTable,
  TChart,
  TBadge,
  TAvatar,
  TButton,
  TInput,
  TToggleTheme,
  TThemeSettings
} from '../components'
import {
  IconHome,
  IconPackage,
  IconUsers,
  IconShoppingCart,
  IconCurrencyDollar,
  IconArrowUpRight,
  IconArrowDownRight,
  IconSearch,
  IconDotsVertical,
  IconHomeCog
} from '@tabler/icons-vue'

const navigationItems = [
  { title: 'Dashboard', href: '/dashboard', icon: IconHome, active: true },
  { title: 'Components', href: '/', icon: IconPackage },
  { title: 'Layouts', href: '/layouts', icon: IconHomeCog },
]

const chartSeries = [{
  name: 'Sales',
  data: [31, 40, 28, 51, 42, 109, 100]
}]

const chartOptions = {
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  colors: ['#206bc4']
}

const tableHeaders = [
  { text: "INVOICE", value: "invoice" },
  { text: "CLIENT", value: "client" },
  { text: "VAT NO.", value: "vat" },
  { text: "CREATED", value: "created" },
  { text: "STATUS", value: "status" },
  { text: "PRICE", value: "price" },
  { text: "", value: "actions" },
]

const tableItems = [
  { invoice: "INV-001", client: "Carlson Limited", vat: "87956621", created: "15 Dec 2024", status: "Paid", price: "$887.00" },
  { invoice: "INV-002", client: "Adobe", vat: "87956621", created: "12 Dec 2024", status: "Pending", price: "$1,200.00" },
  { invoice: "INV-003", client: "Bluewolf", vat: "87956621", created: "10 Dec 2024", status: "Paid", price: "$534.00" },
  { invoice: "INV-004", client: "Equinox", vat: "87956621", created: "08 Dec 2024", status: "Overdue", price: "$123.00" },
]
</script>

<template>
  <TLayout :sidebar-items="navigationItems" brand-text="TablerVue">
    <template #navbar-right>
      <div class="nav-item d-none d-md-flex me-3">
        <TInput placeholder="Search…">
          <template #iconLeft>
            <IconSearch class="icon" />
          </template>
        </TInput>
      </div>
      <div class="nav-item d-none d-md-flex me-3">
        <TToggleTheme />
      </div>
    </template>

    <TPageHeader>
      <template #pretitle>Overview</template>
      <template #title>Dashboard</template>
      <template #actions>
        <TButton variant="primary">
          <IconArrowUpRight class="icon" />
          Generate Report
        </TButton>
      </template>
    </TPageHeader>

    <TPageBody>
      <TRow class="row-cards">
        <TCol sm="6" lg="3">
          <TStatsCard title="Sales" value="75%" variant="blue">
            <template #icon>
              <IconShoppingCart />
            </template>
            <template #footer>
              <div class="card-footer border-0 bg-transparent pt-0">
                <span class="text-green d-inline-flex align-items-center lh-1">
                  8%
                  <IconArrowUpRight class="icon ms-1" />
                </span>
                <span class="text-secondary ms-1">since last week</span>
              </div>
            </template>
          </TStatsCard>
        </TCol>
        <TCol sm="6" lg="3">
          <TStatsCard title="Revenue" value="$4,300" variant="green">
            <template #icon>
              <IconCurrencyDollar />
            </template>
            <template #footer>
              <div class="card-footer border-0 bg-transparent pt-0">
                <span class="text-red d-inline-flex align-items-center lh-1">
                  -2%
                  <IconArrowDownRight class="icon ms-1" />
                </span>
                <span class="text-secondary ms-1">since last week</span>
              </div>
            </template>
          </TStatsCard>
        </TCol>
        <TCol sm="6" lg="3">
          <TStatsCard title="New Clients" value="678" variant="orange">
            <template #icon>
              <IconUsers />
            </template>
            <template #footer>
              <div class="card-footer border-0 bg-transparent pt-0">
                <span class="text-green d-inline-flex align-items-center lh-1">
                  12%
                  <IconArrowUpRight class="icon ms-1" />
                </span>
                <span class="text-secondary ms-1">since last month</span>
              </div>
            </template>
          </TStatsCard>
        </TCol>
        <TCol sm="6" lg="3">
          <TStatsCard title="Active Users" value="2,450" variant="azure">
            <template #icon>
              <IconUsers />
            </template>
            <template #footer>
              <div class="card-footer border-0 bg-transparent pt-0">
                <span class="text-green d-inline-flex align-items-center lh-1">
                  5%
                  <IconArrowUpRight class="icon ms-1" />
                </span>
                <span class="text-secondary ms-1">today</span>
              </div>
            </template>
          </TStatsCard>
        </TCol>

        <TCol lg="8">
          <TCard title="Sales Report">
            <TChart type="area" :series="chartSeries" :options="chartOptions" :height="350" />
          </TCard>
        </TCol>

        <TCol lg="4">
          <TCard title="Recent Activity">
            <div class="list-group list-group-flush">
              <div v-for="i in 5" :key="i" class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <TAvatar size="sm">U{{ i }}</TAvatar>
                  </div>
                  <div class="col text-truncate">
                    <a href="#" class="text-body d-block" @click.prevent>User {{ i }}</a>
                    <div class="text-secondary text-truncate mt-n1">Purchased the premium plan.</div>
                  </div>
                </div>
              </div>
            </div>
          </TCard>
        </TCol>

        <TCol cols="12">
          <TCard title="Invoices">
            <TDataTable :headers="tableHeaders" :items="tableItems">
              <template #item-status="{ status }">
                <TBadge :variant="status === 'Paid' ? 'success' : (status === 'Pending' ? 'warning' : 'danger')">
                  {{ status }}
                </TBadge>
              </template>
              <template #item-actions>
                <TButton variant="ghost-primary" icon>
                  <IconDotsVertical class="icon" />
                </TButton>
              </template>
            </TDataTable>
          </TCard>
        </TCol>
      </TRow>
    </TPageBody>
    <TThemeSettings />
  </TLayout>
</template>

<script lang="ts">
export default {
  name: 'DashboardView'
}
</script>
