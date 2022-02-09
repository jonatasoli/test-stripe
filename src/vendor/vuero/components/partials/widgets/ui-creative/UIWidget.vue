<script setup lang="ts">
// @ts-nocheck

const props = defineProps<{
  straight?: boolean
}>()
</script>

<template>
  <div class="widget" :class="[props.straight && 'is-straight']">
    <slot name="header"></slot>
    <slot name="body"></slot>
  </div>
</template>
