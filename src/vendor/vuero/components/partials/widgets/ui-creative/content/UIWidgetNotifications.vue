<script setup lang="ts">
// @ts-nocheck

const props = withDefaults(
  defineProps<{
    notifications?: any[]
  }>(),
  {
    notifications: () => []
  }
)
</script>

<template>
  <div class="widget-content">
    <ul>
      <li v-for="notification in props.notifications" :key="notification.id">
        <a>
          <span>{{ notification.category }}</span>
          <VTag rounded :label="notification.count" />
        </a>
      </li>
    </ul>
  </div>
</template>
