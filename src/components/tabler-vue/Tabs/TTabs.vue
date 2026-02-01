<script setup lang="ts">
import { ref, provide, watch } from 'vue'

interface Props {
  modelValue?: string | number
  pills?: boolean
  fill?: boolean
  vertical?: boolean
  cardHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  pills: false,
  fill: false,
  vertical: false,
  cardHeader: false,
})

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.modelValue)
const tabs = ref<any[]>([])

provide('tabs-provider', {
  activeTab,
  registerTab: (tab: any) => {
    tabs.value.push(tab)
    if (activeTab.value === undefined && tabs.value.length === 1) {
      activeTab.value = tab.id
    }
  },
  unregisterTab: (id: string) => {
    tabs.value = tabs.value.filter(t => t.id !== id)
  }
})

watch(() => props.modelValue, (val) => {
  activeTab.value = val
})

watch(activeTab, (val) => {
  emit('update:modelValue', val)
})

const selectTab = (id: string) => {
  activeTab.value = id
}
</script>

<template>
  <div :class="{ 'row': vertical }">
    <div :class="{ 'col-auto': vertical }">
      <ul class="nav" :class="{
        'nav-tabs': !pills,
        'nav-pills': pills,
        'nav-fill': fill,
        'flex-column': vertical,
        'card-header-tabs': cardHeader && !pills,
        'card-header-pills': cardHeader && pills
      }" role="tablist">
        <li v-for="tab in tabs" :key="tab.id" class="nav-item">
          <a href="javascript:void(0)" class="nav-link"
            :class="{ active: activeTab === tab.id, disabled: tab.disabled }" role="tab"
            @click.prevent="selectTab(tab.id)">
            <component :is="tab.icon" v-if="tab.icon" class="icon me-2" />
            {{ tab.title }}
          </a>
        </li>
      </ul>
    </div>
    <div :class="{ 'col': vertical, 'tab-content': true, 'mt-3': !cardHeader && !vertical }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TTabs'
}
</script>
