<template>
  <div class="layout-builder">
    <v-loader :active="isLoading" class="primary" size="xl" style="width: 100vw; height: 100vh" translucent>
      <navbar v-bind="navArgs" />
      <router-view #="{ Component }">
        <transition name="slide-x">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-loader>
  </div>
</template>

<script lang="ts" setup>
import { LayoutModule } from '@/store'
import Navbar from '@/components/menus/Navbar/Navbar.vue'
import VLoader from '@/vendor/vuero/components/base/loader/VLoader.vue'
import { computed } from 'vue'
import { getModule } from 'vuex-module-decorators'
import { useStore } from 'vuex'

const theme = {
  rounded: 4,

  sizes: {
    mainContainer: {
      height: 60,

      items: {
        maxWidth: 100
      }
    },

    popup: {
      width: 790,
      height: 320
    }
  },

  colors: {
    popup: {
      backgroundColor: 'white',

      pills: {
        activeColor: 'white',
        backgroundActiveColor: '#f5b342',
        inactiveColor: '#666',
        backgroundInactiveColor: 'transparent',
        hoverColor: '#f5b342',
        backgroundHoverColor: '#ffe9c2'
      },

      list: {
        titleColor: '#666',
        titleHoverColor: '#f5b342',
        color: '#666',
        hoverColor: '#f5b342',
        separatorColor: '#efefef'
      },

      scroll: {
        backgroundColor: '#dedede',
        thumbColor: '#f5b342'
      }
    },

    mainContainer: {
      backgroundColor: 'white',

      items: {
        hoverColor: '#f5b342',
        activeColor: 'white',
        inactiveColor: '#666',
        backgroundHoverColor: '#ffe9c2',
        backgroundActiveColor: '#f5b342',
        backgroundInactiveColor: 'transparent'
      }
    }
  }
}

const navArgs = {
  layout: {
    ...theme,
    sizes: {
      ...theme.sizes,
      popup: undefined
    }
  }
}
// Store
const store = useStore()

const layout = getModule(LayoutModule, store)

const isLoading = computed(() => layout.isLoading)
</script>
