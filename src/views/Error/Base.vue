<template>
  <div class="request-error">
    <div class="error-container">
      <div class="error-wrapper">
        <div class="error-inner has-text-centered">
          <slot name="icon"></slot>
          <h3 class="dark-inverted">{{ props.title }}</h3>
          <p>{{ props.text }}</p>
          <div class="button-wrap">
            <v-button color="primary" rounded @click="handleClick">{{ props.buttonText }}</v-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onBeforeMount } from 'vue'
import VButton from '@/vendor/vuero/components/base/button/VButton.vue'
import { usePageTitle } from '@/core/helpers/usePageTitle'
import { useStore } from 'vuex'
const store = useStore()

onBeforeMount(() => {
  usePageTitle('Alguma coisa deu errado!', store)
})

const emit = defineEmits(['click'])

const props = defineProps<{
  title: string
  text: string
  buttonText: string
}>()

/**
 * Emits a click event to the parent element.
 */
function handleClick(): void {
  emit('click')
}
</script>

<style lang="scss">
@import '../../style/abstracts/mixins';
@import '../../style/pages/generic/utility';
</style>
