<script setup lang="ts">
interface Address {
  name: string
  lines: string[]
  email?: string
}

interface InvoiceItem {
  name: string
  description?: string
  quantity: number | string
  price: string | number
  amount: string | number
}

interface Total {
  label: string
  value: string | number
  bold?: boolean
}

interface Props {
  invoiceId: string
  company?: Address
  client?: Address
  items?: InvoiceItem[]
  totals?: Total[]
  note?: string
}

withDefaults(defineProps<Props>(), {
  items: () => [],
  totals: () => []
})
</script>

<template>
  <div class="card card-lg">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <slot name="company">
            <template v-if="company">
              <p class="h3">{{ company.name }}</p>
              <address>
                <template v-for="(line, i) in company.lines" :key="i">
                  {{ line }}<br />
                </template>
                {{ company.email }}
              </address>
            </template>
          </slot>
        </div>
        <div class="col-6 text-end">
          <slot name="client">
            <template v-if="client">
              <p class="h3">{{ client.name }}</p>
              <address>
                <template v-for="(line, i) in client.lines" :key="i">
                  {{ line }}<br />
                </template>
                {{ client.email }}
              </address>
            </template>
          </slot>
        </div>
        <div class="col-12 my-5">
          <slot name="header">
            <h1>Invoice {{ invoiceId }}</h1>
          </slot>
        </div>
      </div>
      <table class="table table-transparent table-responsive">
        <thead>
          <tr>
            <th class="text-center" style="width: 1%"></th>
            <th>Product</th>
            <th class="text-center" style="width: 1%">Qnt</th>
            <th class="text-end" style="width: 1%">Unit</th>
            <th class="text-end" style="width: 1%">Amount</th>
          </tr>
        </thead>
        <tbody>
          <slot name="items">
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <p class="strong mb-1">{{ item.name }}</p>
                <div v-if="item.description" class="text-secondary">{{ item.description }}</div>
              </td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-end">{{ item.price }}</td>
              <td class="text-end">{{ item.amount }}</td>
            </tr>
          </slot>
        </tbody>
        <tfoot>
          <tr v-for="(total, index) in totals" :key="index">
            <td colspan="4" :class="['text-end', total.bold ? 'font-weight-bold text-uppercase' : 'strong']">
              {{ total.label }}
            </td>
            <td :class="['text-end', total.bold ? 'font-weight-bold' : '']">
              {{ total.value }}
            </td>
          </tr>
        </tfoot>
      </table>
      <p v-if="note || $slots.footer" class="text-secondary text-center mt-5">
        <slot name="footer">{{ note }}</slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TInvoice'
}
</script>
