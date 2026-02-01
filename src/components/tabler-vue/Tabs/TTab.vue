<script setup lang="ts">
import { inject, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  id?: string
  title: string
  disabled?: boolean
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  id: () => `tab-${Math.random().toString(36).slice(2, 9)}`,
  disabled: false,
})

const provider = inject<any>('tabs-provider')

onMounted(() => {
  if (provider) {
    provider.registerTab({
      id: props.id,
      title: props.title,
      disabled: props.disabled,
      icon: props.icon
    })
  }
})

onUnmounted(() => {
  if (provider) {
    provider.unregisterTab(props.id)
  }
})

const active = computed(() => provider?.activeTab.value === props.id)
</script>

<template>
  <div v-if="active" class="tab-pane active show" role="tabpanel">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TTab'
}
</script>
