<script setup lang="ts">
// @ts-nocheck

const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'UI Widget'
  }
)
</script>

<template>
  <div class="widget-toolbar">
    <div class="left">
      <h3>{{ props.title }}</h3>
    </div>
    <div class="right">
      <WidgetDropdown />
    </div>
  </div>
</template>
