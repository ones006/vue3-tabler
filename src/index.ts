// Main library entry point for vue3-tabler
import type { App, Plugin } from 'vue'

// Export all components
export * from './components/index'

// Import all components for plugin installation
import * as components from './components/index'

// Define the plugin
export const Vue3Tabler: Plugin = {
  install(app: App) {
    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

// Export as default for convenience
export default Vue3Tabler
