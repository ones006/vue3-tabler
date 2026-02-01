<script setup lang="ts">
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

interface Props {
  headers: any[]
  items: any[]
  loading?: boolean
  searchField?: string
  searchValue?: string
  rowsPerPage?: number
  buttonsPagination?: boolean
  hideFooter?: boolean
  borderless?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  rowsPerPage: 10,
  buttonsPagination: true,
  hideFooter: false,
  borderless: false
})

const emit = defineEmits(['clickRow'])
</script>

<template>
  <div class="card">
    <div class="table-responsive">
      <Vue3EasyDataTable :headers="headers" :items="items" :loading="loading" :search-field="searchField"
        :search-value="searchValue" :rows-per-page="rowsPerPage" :buttons-pagination="buttonsPagination"
        :hide-footer="hideFooter" table-class-name="tabler-easy-table"
        @click-row="(row: any) => $emit('clickRow', row)">
        <!-- Forward all slots to underlying component -->
        <template v-for="(_, slot) in $slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope || {}" />
        </template>
      </Vue3EasyDataTable>
    </div>
  </div>
</template>

<style>
/* Styling to match Tabler 1.4 */
.tabler-easy-table {
  --easy-table-border: 1px solid var(--tblr-border-color);
  --easy-table-row-border: 1px solid var(--tblr-border-color);

  --easy-table-header-font-size: 0.75rem;
  --easy-table-header-height: 2rem;
  --easy-table-header-font-color: var(--tblr-muted);
  --easy-table-header-background-color: var(--tblr-bg-surface-secondary);

  --easy-table-body-even-row-font-color: var(--tblr-body-color);
  --easy-table-body-even-row-background-color: var(--tblr-bg-surface);

  --easy-table-body-row-font-color: var(--tblr-body-color);
  --easy-table-body-row-background-color: var(--tblr-bg-surface);
  --easy-table-body-row-height: 2.5rem;
  --easy-table-body-row-font-size: 0.875rem;

  --easy-table-footer-background-color: var(--tblr-bg-surface);
  --easy-table-footer-font-color: var(--tblr-body-color);
  --easy-table-footer-font-size: 0.875rem;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 3rem;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: var(--tblr-bg-surface);
  --easy-table-scrollbar-color: var(--tblr-bg-surface);
  --easy-table-scrollbar-thumb-color: var(--tblr-border-color);
  --easy-table-scrollbar-corner-color: var(--tblr-bg-surface);

  --easy-table-loading-mask-background-color: rgba(0, 0, 0, 0.5);
}

.tabler-easy-table .vue3-easy-data-table__main {
  border: none !important;
}

.tabler-easy-table thead th {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.tabler-easy-table .vue3-easy-data-table__footer {
  border-top: 1px solid var(--tblr-border-color) !important;
}

.tabler-easy-table .buttons-pagination .item.active {
  background-color: #206bc4 !important;
  border-color: #206bc4 !important;
}
</style>

<script lang="ts">
export default {
  name: 'TDataTable'
}
</script>
