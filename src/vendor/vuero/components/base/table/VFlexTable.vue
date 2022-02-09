<script setup lang="ts">
// @ts-nocheck

import { defineProps } from 'vue'
import VFlexTableRowMedia, {
  VFlexTableRowMediaProps
} from '@/vendor/vuero/components/base/table/VFlexTableRowMedia.vue'

export interface VFlexTableProps {
  compact?: boolean
  items: VFlexTableRowMediaProps['rows']
}

const props = defineProps<VFlexTableProps>()
</script>

<template>
  <div class="flex-table" :class="{ 'is-compact': props.compact }">
    <slot name="header"></slot>
    <VFlexTableRowMedia :rows="props.items" />
  </div>
</template>
