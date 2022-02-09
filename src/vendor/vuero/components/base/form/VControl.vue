<script setup lang="ts">
// @ts-nocheck

import { computed } from 'vue'

export interface VControlProps {
  icon?: string
  isValid?: boolean
  hasError?: boolean
  loading?: boolean
  expanded?: boolean
  textaddon?: boolean
  nogrow?: boolean
  subcontrol?: boolean
}

const props = withDefaults(defineProps<VControlProps>(), {
  icon: undefined
})

const isIconify = computed(() => {
  return props.icon && props.icon.indexOf(':') !== -1
})
</script>

<template>
  <div
    class="control"
    :class="[
      icon && 'has-icon',
      loading && 'is-loading',
      expanded && 'is-expanded',
      nogrow && 'is-nogrow',
      textaddon && 'is-textarea-addon',
      isValid && 'has-validation has-success',
      hasError && 'has-validation has-error',
      subcontrol && 'subcontrol'
    ]"
  >
    <slot></slot>
    <div class="form-icon" v-if="icon">
      <i aria-hidden="true" class="iconify" :data-icon="icon" v-if="isIconify"></i>
      <i aria-hidden="true" :class="icon" v-else></i>
    </div>
    <div class="validation-icon is-success" v-if="isValid">
      <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
    </div>
    <div class="fast-crud-align-icon validation-icon is-error" v-else-if="hasError">
      <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
    </div>
    <slot name="extra"></slot>
  </div>
</template>

<style lang="scss" scoped>
.is-nogrow {
  flex-grow: 0 !important;
}
.fast-crud-align-icon {
  padding-right: 2rem;
}
</style>
