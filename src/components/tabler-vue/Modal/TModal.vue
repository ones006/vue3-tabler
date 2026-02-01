<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue'
import { Modal } from '@tabler/core'

interface Props {
  modelValue?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full-width'
  centered?: boolean
  scrollable?: boolean
  blur?: boolean
  status?: string
  noCloseButton?: boolean
  staticBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  size: 'md',
  centered: true,
  scrollable: false,
  blur: true,
  status: '',
  noCloseButton: false,
  staticBackdrop: false,
})

const emit = defineEmits(['update:modelValue', 'show', 'shown', 'hide', 'hidden'])

const modalRef = ref<HTMLElement | null>(null)
let bsModal: any = null

onMounted(async () => {
  if (modalRef.value) {
    bsModal = new Modal(modalRef.value, {
      backdrop: props.staticBackdrop ? 'static' : true,
      keyboard: !props.staticBackdrop
    })

    modalRef.value.addEventListener('show.bs.modal', () => emit('show'))
    modalRef.value.addEventListener('shown.bs.modal', () => emit('shown'))
    modalRef.value.addEventListener('hide.bs.modal', () => {
      emit('update:modelValue', false)
      emit('hide')
    })
    modalRef.value.addEventListener('hidden.bs.modal', () => emit('hidden'))

    if (props.modelValue) {
      bsModal.show()
    }
  }
})

onUnmounted(() => {
  if (bsModal) {
    bsModal.hide()
    bsModal.dispose()
  }
})

watch(() => props.modelValue, (val) => {
  if (!bsModal) return
  if (val) {
    bsModal.show()
  } else {
    bsModal.hide()
  }
})
</script>

<template>
  <div ref="modalRef" class="modal fade" :class="{ 'modal-blur': blur }" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" :class="{
      [`modal-${size}`]: size !== 'md' && size !== 'full-width',
      'modal-full-width': size === 'full-width',
      'modal-dialog-centered': centered,
      'modal-dialog-scrollable': scrollable
    }" role="document">
      <div class="modal-content">
        <div v-if="status" :class="`modal-status bg-${status}`"></div>

        <button v-if="!noCloseButton" type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>

        <div v-if="$slots.header || title" class="modal-header">
          <h5 class="modal-title">
            <slot name="header">{{ title }}</slot>
          </h5>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TModal'
}
</script>
