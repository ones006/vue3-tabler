// Main library entry point for vue3-tabler
import type { App, Plugin, Component } from 'vue'

// Export all components
export * from './components/index'

// Import all components for plugin installation
import * as components from './components/index'

// Plugin options interface
export interface Vue3TablerOptions {
  linkComponent?: Component
}

// Define the plugin
export const Vue3Tabler: Plugin = {
  install(app: App, options?: Vue3TablerOptions) {
    // Provide global link component if specified
    if (options?.linkComponent) {
      app.provide('linkComponent', options.linkComponent)
    }

    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

// Export as default for convenience
export default Vue3Tabler
