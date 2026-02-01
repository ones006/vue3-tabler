<script setup lang="ts">
import { onMounted } from 'vue'
import { IconBrush, IconRotate } from '@tabler/icons-vue'
import { useThemeStore } from '../../../stores/theme'

const themeStore = useThemeStore()

const colors = [
  'blue', 'azure', 'indigo', 'purple', 'pink', 'red',
  'orange', 'yellow', 'lime', 'green', 'teal', 'cyan'
]

const fonts = ['sans-serif', 'serif', 'monospace', 'comic']
const bases = ['slate', 'gray', 'zinc', 'neutral', 'stone']
const radiuses = ['0', '0.5', '1', '1.5', '2']

onMounted(() => {
  themeStore.applyToDOM()
})
</script>

<template>
  <div class="settings">
    <a href="javascript:void(0)" class="btn btn-floating btn-icon btn-primary" data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasSettings" aria-controls="offcanvasSettings" aria-label="Theme Settings">
      <IconBrush class="icon" />
    </a>

    <div class="offcanvas offcanvas-start offcanvas-narrow" tabindex="-1" id="offcanvasSettings">
      <div class="offcanvas-header border-bottom">
        <h2 class="offcanvas-title">Theme Settings</h2>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column text-start">
        <div class="theme-settings-scroll">
          <div class="mb-4">
            <label class="form-label">Color mode</label>
            <p class="form-hint">Choose the color mode for your app.</p>
            <div class="form-selectgroup">
              <label class="form-selectgroup-item">
                <input type="radio" v-model="themeStore.theme" value="light" class="form-selectgroup-input"
                  @change="themeStore.setSetting('theme', 'light')" />
                <span class="form-selectgroup-label">Light</span>
              </label>
              <label class="form-selectgroup-item">
                <input type="radio" v-model="themeStore.theme" value="dark" class="form-selectgroup-input"
                  @change="themeStore.setSetting('theme', 'dark')" />
                <span class="form-selectgroup-label">Dark</span>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Color scheme</label>
            <p class="form-hint">The perfect color mode for your app.</p>
            <div class="row g-2">
              <div v-for="color in colors" :key="color" class="col-auto">
                <label class="form-colorinput">
                  <input type="radio" v-model="themeStore['theme-primary']" :value="color" class="form-colorinput-input"
                    @change="themeStore.setSetting('theme-primary', color)" />
                  <span :class="`form-colorinput-color bg-${color}`"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Font family</label>
            <p class="form-hint">Choose the font family that fits your app.</p>
            <div class="form-selectgroup form-selectgroup-boxes d-flex flex-column">
              <label v-for="font in fonts" :key="font" class="form-selectgroup-item flex-fill">
                <input type="radio" v-model="themeStore['theme-font']" :value="font" class="form-selectgroup-input"
                  @change="themeStore.setSetting('theme-font', font)" />
                <div class="form-selectgroup-label d-flex align-items-center p-3">
                  <div class="me-3">
                    <span class="form-selectgroup-check"></span>
                  </div>
                  <div>
                    {{ font.charAt(0).toUpperCase() + font.slice(1) }}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Theme base</label>
            <p class="form-hint">Choose the gray shade for your app.</p>
            <div class="form-selectgroup form-selectgroup-boxes d-flex flex-column">
              <label v-for="base in bases" :key="base" class="form-selectgroup-item flex-fill">
                <input type="radio" v-model="themeStore['theme-base']" :value="base" class="form-selectgroup-input"
                  @change="themeStore.setSetting('theme-base', base)" />
                <div class="form-selectgroup-label d-flex align-items-center p-3">
                  <div class="me-3">
                    <span class="form-selectgroup-check"></span>
                  </div>
                  <div>
                    {{ base.charAt(0).toUpperCase() + base.slice(1) }}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Corner Radius</label>
            <p class="form-hint">Choose the border radius factor for your app.</p>
            <div class="form-selectgroup">
              <label v-for="radius in radiuses" :key="radius" class="form-selectgroup-item">
                <input type="radio" v-model="themeStore['theme-radius']" :value="radius" class="form-selectgroup-input"
                  @change="themeStore.setSetting('theme-radius', radius)" />
                <span class="form-selectgroup-label">{{ radius }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-3 border-top space-y">
          <button type="button" class="btn w-100" @click="themeStore.reset()">
            <IconRotate class="icon" />
            Reset changes
          </button>
          <button type="button" class="btn btn-primary w-100" data-bs-dismiss="offcanvas">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TThemeSettings'
}
</script>

<style scoped>
.btn-floating {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1050;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.offcanvas-narrow {
  width: 350px;
}

.theme-settings-scroll {
  overflow-y: auto;
  flex: 1;
}

.space-y>*+* {
  margin-top: 0.5rem;
}

/* Ensure text is left aligned and override global center alignment if present */
.offcanvas-body {
  text-align: left !important;
}

.form-selectgroup-boxes .form-selectgroup-label {
  text-align: left;
}
</style>
