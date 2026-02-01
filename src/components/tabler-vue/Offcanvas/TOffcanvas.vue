<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Offcanvas } from '@tabler/core'

interface Props {
  modelValue: boolean
  title?: string
  placement?: 'start' | 'end' | 'top' | 'bottom'
  backdrop?: boolean | 'static'
  scroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  placement: 'start',
  backdrop: true,
  scroll: false
})

const emit = defineEmits(['update:modelValue', 'hidden', 'shown'])

const offcanvasRef = ref<HTMLElement | null>(null)

const toggle = (show: boolean) => {
  if (!offcanvasRef.value) return

  // Tabler uses Bootstrap Offcanvas
  // We can use the data attributes or the JS API
  // Using JS API is more reliable for Vue
  let instance = Offcanvas.getInstance(offcanvasRef.value)
  if (!instance) {
    instance = new Offcanvas(offcanvasRef.value, {
      backdrop: props.backdrop,
      scroll: props.scroll
    })
  }

  if (show) instance.show()
  else instance.hide()
}

watch(() => props.modelValue, (val) => {
  toggle(val)
})

onMounted(() => {
  if (offcanvasRef.value) {
    offcanvasRef.value.addEventListener('hidden.bs.offcanvas', () => {
      emit('update:modelValue', false)
      emit('hidden')
    })
    offcanvasRef.value.addEventListener('shown.bs.offcanvas', () => {
      emit('shown')
    })

    if (props.modelValue) {
      toggle(true)
    }
  }
})
</script>

<template>
  <div ref="offcanvasRef" class="offcanvas" :class="`offcanvas-${placement}`" tabindex="-1" :data-bs-scroll="scroll"
    :data-bs-backdrop="backdrop">
    <div class="offcanvas-header border-bottom">
      <h2 class="offcanvas-title">
        <slot name="title">{{ title }}</slot>
      </h2>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TOffcanvas'
}
</script>
