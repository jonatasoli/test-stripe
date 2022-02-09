<template>
  <div class="not-found-error">
    <base-error
      button-text="Ir Para a Home"
      title="Ops! Ocorreu um problema."
      text="Parece que a página desejada não foi encontrada."
      @click="handleClick"
    >
      <template #icon>
        <request-error-icon />
      </template>
    </base-error>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import BaseError from '@/views/Error/Base.vue'
import RequestErrorIcon from '@/components/assets/RequestErrorIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(defineProps<{ redirectUrl?: string }>(), { redirectUrl: '/' })

/**
 * Redirects to the props.redirectUrl route.
 */
function handleClick(): void {
  router.push(props.redirectUrl)
}
</script>
