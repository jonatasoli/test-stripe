<template>
  <div class="not-found-error">
    <base-error
      button-text="Recarregar"
      title="Ops! Ocorreu um problema."
      text="Parece que um erro inesperado ocorreu, tente novamente mais tarde!"
      @click="handleClick"
    >
      <template #icon>
        <city-icon />
      </template>
    </base-error>
  </div>
</template>

<script lang="ts" setup>
import BaseError from '@/views/Error/Base.vue'
import CityIcon from '@/components/assets/CityIcon.vue'

/**
 * TODO: make it reload the layout
 */
/**
 * Reloads the page.
 */
function handleClick(): void {
  window.location.reload()
}
</script>
