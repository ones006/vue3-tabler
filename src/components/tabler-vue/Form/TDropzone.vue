<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

interface Props {
  action?: string
  id?: string
  multiple?: boolean
  maxFiles?: number
  message?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  action: './',
  id: () => `dropzone-${Math.random().toString(36).substr(2, 9)}`,
  multiple: false,
  message: 'Drop files here or click to upload',
  description: ''
})

const emit = defineEmits(['success', 'error', 'addedfile', 'removedfile'])

const dropzoneRef = ref<any>(null)

const initDropzone = () => {
  if ((window as any).Dropzone) {
    dropzoneRef.value = new (window as any).Dropzone(`#${props.id}`, {
      url: props.action,
      uploadMultiple: props.multiple,
      maxFiles: props.maxFiles,
      addRemoveLinks: true,
      init: function (this: any) {
        this.on("success", (file: any, response: any) => emit('success', { file, response }));
        this.on("error", (file: any, message: any) => emit('error', { file, message }));
        this.on("addedfile", (file: any) => emit('addedfile', file));
        this.on("removedfile", (file: any) => emit('removedfile', file));
      }
    })
  } else {
    setTimeout(() => {
      if ((window as any).Dropzone) {
        initDropzone()
      } else {
        console.warn('Dropzone not found. Please ensure the library is loaded.')
      }
    }, 500)
  }
}

onMounted(() => {
  initDropzone()
})

onUnmounted(() => {
  if (dropzoneRef.value) {
    dropzoneRef.value.destroy()
  }
})
</script>

<template>
  <form :id="id" :action="action" class="dropzone" autocomplete="off" novalidate>
    <div class="fallback">
      <input name="file" type="file" :multiple="multiple" />
    </div>
    <div v-if="message || description" class="dz-message">
      <h3 class="dropzone-msg-title">{{ message }}</h3>
      <span v-if="description" class="dropzone-msg-desc">{{ description }}</span>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: 'TDropzone'
}
</script>
