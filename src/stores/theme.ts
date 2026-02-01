import { defineStore } from 'pinia'

export interface ThemeSettings {
  theme: 'light' | 'dark'
  'theme-primary': string
  'theme-font': string
  'theme-base': string
  'theme-radius': string
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeSettings => ({
    theme: (localStorage.getItem('tabler-theme') as 'light' | 'dark') || 'light',
    'theme-primary': localStorage.getItem('tabler-theme-primary') || 'blue',
    'theme-font': localStorage.getItem('tabler-theme-font') || 'sans-serif',
    'theme-base': localStorage.getItem('tabler-theme-base') || 'gray',
    'theme-radius': localStorage.getItem('tabler-theme-radius') || '1',
  }),

  actions: {
    setSetting(key: keyof ThemeSettings, value: string) {
      this.$state[key] = value as any
      localStorage.setItem(`tabler-${key}`, value)
      this.applyToDOM()
    },

    reset() {
      const defaults: ThemeSettings = {
        theme: 'light',
        'theme-primary': 'blue',
        'theme-font': 'sans-serif',
        'theme-base': 'gray',
        'theme-radius': '1',
      }

      for (const key in defaults) {
        const k = key as keyof ThemeSettings
        this.setSetting(k, defaults[k])
      }
    },

    applyToDOM() {
      for (const key in this.$state) {
        const k = key as keyof ThemeSettings
        document.documentElement.setAttribute(`data-bs-${k}`, this.$state[k])
      }
    }
  }
})
