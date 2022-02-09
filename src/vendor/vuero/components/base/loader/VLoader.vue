<script setup lang="ts">
export type VLoaderSize = 'small' | 'large' | 'xl'
export type VLoaderWrapperRadius = 'regular' | 'smooth' | 'rounded'
export interface VLoaderProps {
  size?: VLoaderSize
  card?: VLoaderWrapperRadius
  active?: boolean
  grey?: boolean
  translucent?: boolean
}

const props = withDefaults(defineProps<VLoaderProps>(), {
  size: undefined,
  card: undefined
})
</script>

<template>
  <div class="has-loader primary" :class="[props.active && 'has-loader-active']">
    <div
      v-if="props.active"
      class="v-loader-wrapper is-active"
      style="color: var(--primary)"
      :class="[
        props.grey && 'is-grey',
        props.translucent && 'is-translucent',
        props.card === 'regular' && 's-card',
        props.card === 'smooth' && 'r-card',
        props.card === 'rounded' && 'l-card'
      ]"
    >
      <div class="loader is-loading" :class="[props.size && `is-${props.size}`]"></div>
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .button.is-loading::after,
  .loader,
  .select.is-loading::after,
  .control.is-loading::after {
    border-left-color: var(--primary) !important;
    border-bottom-color: var(--primary) !important;
  }
}
</style>
