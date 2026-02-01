<script setup lang="ts">
import { onMounted } from 'vue'
import { IconMoon, IconSun } from '@tabler/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  const newTheme = themeStore.theme === 'dark' ? 'light' : 'dark'
  themeStore.setSetting('theme', newTheme)
}

onMounted(() => {
  themeStore.applyToDOM()
})
</script>

<template>
  <div class="nav-item">
    <a href="javascript:void(0)" class="nav-link px-0"
      :title="themeStore.theme === 'dark' ? 'Enable light mode' : 'Enable dark mode'" @click.prevent="toggleTheme">
      <IconMoon v-if="themeStore.theme === 'light'" class="icon" />
      <IconSun v-else class="icon" />
    </a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TToggleTheme'
}
</script>
