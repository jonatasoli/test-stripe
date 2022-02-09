<script setup lang="ts">
// @ts-nocheck

import { defineProps } from 'vue'

export interface VFlexTableRowMediaProps {
  rows?: Record<string, string>[]
}

const props = defineProps<VFlexTableRowMediaProps>()
</script>

<template>
  <div v-for="row in props.rows" class="flex-table-item">
    <div class="flex-table-cell" v-for="column in Object.keys(row)">
      {{ row[column] }}
    </div>
  </div>
</template>
