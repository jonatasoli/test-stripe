<template>
  <div class="app" :style="appStyle">
    <Payment />
  </div>
</template>

<script lang="ts" setup>
import 'notyf/notyf.min.css'
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'
import Payment from '@/components/payment/Payment.vue'
import { LayoutService } from '@/core/services'
import { ProjectModule } from '@/store'
import { getModule } from 'vuex-module-decorators'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Store and Router
const store = useStore()
const router = useRouter()

// Modules
const project = getModule(ProjectModule, store)

// Computed props
const appStyle = computed(() => project.formattedColors)

onBeforeMount(async () => {
  /**
   * this is to override the layout config using saved data from localStorage
   * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
   */
  const layout = new LayoutService(router, store)
  await layout.mount()
})

onBeforeUnmount(async () => {
  /**
   * this is to override the layout config using saved data from localStorage
   * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
   */
})
</script>

<style lang="scss">
// This style cannot be scoped as it is intended to reach child components
.app {
  position: relative;
}
// Makes the HTML use the entire page, not just the space used by the components
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
