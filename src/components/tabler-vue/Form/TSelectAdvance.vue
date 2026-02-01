<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  label: string
  value: any
  avatar?: string
  description?: string
  [key: string]: any
}

interface Props {
  modelValue?: any | any[]
  options?: Option[]
  placeholder?: string
  multiple?: boolean
  searchable?: boolean
  disabled?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  placeholder: 'Select...',
  multiple: false,
  searchable: true,
  disabled: false,
  clearable: true
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref<HTMLElement | null>(null)

const selectedOptions = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.options.filter(opt => props.modelValue.includes(opt.value))
  }
  const found = props.options.find(opt => opt.value === props.modelValue)
  return found ? [found] : []
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(opt =>
    opt.label.toLowerCase().includes(query) ||
    (opt.description && opt.description.toLowerCase().includes(query))
  )
})

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) searchQuery.value = ''
}

const selectOption = (option: Option) => {
  if (props.multiple) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(option.value)
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(option.value)
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }
}

const removeOption = (option: Option) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter(v => v !== option.value)
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', null)
    emit('change', null)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" class="ts-wrapper" :class="{ 'is-focused': isOpen, 'disabled': disabled }">
    <div class="ts-control" @click="toggleDropdown">
      <div v-if="selectedOptions.length === 0 && !searchQuery" class="text-secondary opacity-50">
        {{ placeholder }}
      </div>

      <div v-for="opt in selectedOptions" :key="opt.value" :class="multiple ? 'ts-item' : ''">
        <div class="d-flex align-items-center">
          <span v-if="opt.avatar" class="avatar avatar-xs me-2"
            :style="{ backgroundImage: `url(${opt.avatar})` }"></span>
          <span>{{ opt.label }}</span>
          <a v-if="multiple" href="javascript:void(0)" class="ms-1 text-reset opacity-50"
            @click.stop="removeOption(opt)">&times;</a>
        </div>
      </div>

      <input v-if="searchable && isOpen" ref="searchInput" v-model="searchQuery" type="text" class="ts-input-search"
        autocomplete="off" @click.stop />
    </div>

    <div v-if="isOpen" class="ts-dropdown">
      <div class="ts-dropdown-content">
        <div v-for="opt in filteredOptions" :key="opt.value" class="ts-option"
          :class="{ 'active': Array.isArray(modelValue) ? modelValue.includes(opt.value) : modelValue === opt.value }"
          @click="selectOption(opt)">
          <div class="d-flex align-items-center">
            <span v-if="opt.avatar" class="avatar avatar-xs me-2"
              :style="{ backgroundImage: `url(${opt.avatar})` }"></span>
            <div>
              <div>{{ opt.label }}</div>
              <div v-if="opt.description" class="text-secondary small">{{ opt.description }}</div>
            </div>
          </div>
        </div>
        <div v-if="filteredOptions.length === 0" class="ts-option disabled">
          No results found
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ts-wrapper {
  position: relative;
  width: 100%;
}

.ts-control {
  border: 1px solid #d9dbde;
  padding: 0.4375rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 38px;
  align-items: center;
}

.is-focused .ts-control {
  border-color: #90b1e5;
  box-shadow: 0 0 0 0.25rem rgba(32, 107, 196, 0.25);
}

.ts-item {
  background: #f1f5f9;
  border-radius: 3px;
  padding: 0 6px;
  display: flex;
  align-items: center;
}

.ts-input-search {
  border: none;
  outline: none;
  flex: 1;
  min-width: 60px;
  padding: 0;
}

.ts-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  border: 1px solid #d9dbde;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  max-height: 300px;
  overflow-y: auto;
}

.ts-option {
  padding: 8px 12px;
  cursor: pointer;
}

.ts-option:hover {
  background: #f8fafc;
}

.ts-option.active {
  background: rgba(32, 107, 196, 0.06);
  color: #206bc4;
}

.ts-option.disabled {
  cursor: default;
  color: #64748b;
}

.disabled .ts-control {
  background: #f8fafc;
  cursor: not-allowed;
}
</style>

<script lang="ts">
export default {
  name: 'TSelectAdvance'
}
</script>
