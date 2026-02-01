<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue'

interface Props {
  modelValue?: string
  id?: string
  height?: number
  placeholder?: string
  menubar?: boolean
  statusbar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: () => `wysiwyg-${Math.random().toString(36).substr(2, 9)}`,
  height: 300,
  menubar: false,
  statusbar: false
})

const emit = defineEmits(['update:modelValue', 'change'])
const editorRef = ref<any>(null)

const initEditor = () => {
  if ((window as any).hugeRTE) {
    (window as any).hugeRTE.init({
      selector: `#${props.id}`,
      height: props.height,
      menubar: props.menubar,
      statusbar: props.statusbar,
      setup: (editor: any) => {
        editorRef.value = editor
        editor.on('change', () => {
          const content = editor.getContent()
          emit('update:modelValue', content)
          emit('change', content)
        })
      },
      plugins: [
        "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
        "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media",
        "table", "code", "help", "wordcount"
      ],
      toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat"
    })
  } else {
    // Retry once after a short delay if library is still loading
    setTimeout(() => {
      if ((window as any).hugeRTE) {
        initEditor()
      } else {
        console.warn('hugeRTE not found. Please ensure the library is loaded.')
      }
    }, 500)
  }
}

onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  if (editorRef.value) {
    editorRef.value.remove()
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== editorRef.value.getContent()) {
    editorRef.value.setContent(newVal)
  }
})
</script>

<template>
  <div class="wysiwyg-container">
    <textarea :id="id" :value="modelValue"></textarea>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TWysiwyg'
}
</script>
