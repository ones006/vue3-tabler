<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  floating?: boolean
  disabled?: boolean
  readonly?: boolean
  status?: 'valid' | 'invalid' | ''
  size?: 'sm' | 'md' | 'lg'
  flush?: boolean
  rounded?: boolean
  static?: boolean
  loading?: boolean
  autocomplete?: string
  name?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  floating: false,
  disabled: false,
  readonly: false,
  status: '',
  size: 'md',
  flush: false,
  rounded: false,
  static: false,
  loading: false,
  autocomplete: 'off'
})

const emit = defineEmits(['update:modelValue', 'input', 'change', 'blur', 'focus'])

const classes = computed(() => {
  if (props.static) return 'form-control-plaintext'

  return {
    'form-control': true,
    [`form-control-${props.size}`]: props.size !== 'md',
    'form-control-flush': props.flush,
    'form-control-rounded': props.rounded,
    'is-valid': props.status === 'valid',
    'is-invalid': props.status === 'invalid',
  }
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="[
    $slots.prepend || $slots.append || $slots.prependIcon || $slots.appendIcon ? 'input-group' : '',
    $slots.prependIcon || $slots.appendIcon ? 'input-group-flat' : '',
    loading ? 'input-icon' : '',
    floating ? 'form-floating' : ''
  ]">
    <span v-if="$slots.prepend && !floating" class="input-group-text">
      <slot name="prepend" />
    </span>

    <div :class="{ 'input-icon': $slots.iconLeft || $slots.iconRight || loading, 'flex-fill': !floating }">
      <span v-if="$slots.iconLeft && !floating" class="input-icon-addon">
        <slot name="iconLeft" />
      </span>

      <input :id="id" :name="name" :type="type" :class="classes" :value="modelValue"
        :placeholder="placeholder || (floating ? label : '')" :disabled="disabled" :readonly="readonly"
        :autocomplete="autocomplete" @input="onInput"
        @change="$emit('change', ($event.target as HTMLInputElement).value)" @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)" />

      <label v-if="floating && label" :for="id">{{ label }}</label>

      <span v-if="($slots.iconRight || loading) && !floating" class="input-icon-addon">
        <slot v-if="loading" name="loader">
          <div class="spinner-border spinner-border-sm text-secondary" role="status"></div>
        </slot>
        <slot v-else name="iconRight" />
      </span>
    </div>

    <span v-if="$slots.append && !floating" class="input-group-text">
      <slot name="append" />
    </span>

    <slot name="appendButton" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TInput'
}
</script>
