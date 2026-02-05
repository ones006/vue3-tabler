import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library'

  return {
    plugins: [
      vue(),
      ...(isLibrary ? [dts({
        include: ['src/**/*.ts', 'src/**/*.vue'],
        outDir: 'dist',
        insertTypesEntry: true
      })] : [])
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: isLibrary ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Vue3Tabler',
        fileName: (format) => `vue3-tabler.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        // Externalize dependencies that shouldn't be bundled
        external: [
          'vue',
          'vue-router',
          'pinia',
          '@tabler/core',
          '@tabler/icons-vue',
          'apexcharts',
          'vue3-apexcharts',
          'vue3-easy-data-table'
        ],
        output: {
          // Provide global variables for externalized deps in UMD build
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            pinia: 'Pinia',
            '@tabler/core': 'TablerCore',
            '@tabler/icons-vue': 'TablerIcons',
            apexcharts: 'ApexCharts',
            'vue3-apexcharts': 'VueApexCharts',
            'vue3-easy-data-table': 'Vue3EasyDataTable'
          },
          // Export all named exports
          exports: 'named'
        }
      },
      // Generate source maps for debugging
      sourcemap: true,
      // Clear output directory before build
      emptyOutDir: true
    } : undefined
  }
})
