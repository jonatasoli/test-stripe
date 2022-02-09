<script setup lang="ts">
// @ts-nocheck

import { computed, ref } from 'vue'
import VIcon from '@/vendor/vuero/components/base/icon/VIcon.vue'

export type VTabsType = 'boxed' | 'toggle' | 'rounded'
export type VTabsAlign = 'centered' | 'right'
export interface VTabsItem {
  label: string
  value: string
  icon?: string
}
export interface VTabsProps {
  tabs: VTabsItem[]
  selected?: string
  type?: VTabsType
  align?: VTabsAlign
  slider?: boolean
  slow?: boolean
}

const props = withDefaults(defineProps<VTabsProps>(), {
  selected: undefined,
  type: undefined,
  align: undefined
})

const activeValue = ref(props.selected)
const sliderClass = computed(() => {
  if (!props.slider) {
    return ''
  }

  if (props.type === 'rounded') {
    if (props.tabs.length === 3) {
      return 'is-triple-slider'
    }
    if (props.tabs.length === 2) {
      return 'is-slider'
    }

    return ''
  }

  if (!props.type) {
    if (props.tabs.length === 3) {
      return 'is-squared is-triple-slider'
    }
    if (props.tabs.length === 2) {
      return 'is-squared is-slider'
    }
  }

  return ''
})
</script>

<template>
  <div class="tabs-wrapper" :class="[sliderClass]">
    <div class="tabs-inner">
      <div
        class="tabs"
        :class="[
          props.align === 'centered' && 'is-centered',
          props.align === 'right' && 'is-right',
          props.type === 'rounded' && !props.slider && 'is-toggle is-toggle-rounded',
          props.type === 'toggle' && 'is-toggle',
          props.type === 'boxed' && 'is-boxed'
        ]"
      >
        <ul>
          <li v-for="(tab, key) in tabs" :key="key" :class="[activeValue === tab.value && 'is-active']">
            <a @click="activeValue = tab.value">
              <VIcon v-if="tab.icon" :icon="tab.icon" />
              <span>{{ tab.label }}</span>
            </a>
          </li>
          <li v-if="sliderClass" class="tab-naver"></li>
        </ul>
      </div>
    </div>

    <div class="tab-content is-active">
      <div class="tab-content-inner">
        <slot name="tab" :activeValue="activeValue"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tabs-wrapper {
  .tab-content {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;

    .tab-content-inner {
      display: flex;

      & > * {
        float: left;
        flex-shrink: 0;
        display: inline-block;
        left: 0;
        max-width: 100% !important;
      }
    }
  }
}
</style>
