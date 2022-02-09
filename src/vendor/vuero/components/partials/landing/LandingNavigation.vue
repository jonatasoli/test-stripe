<template>
  <div class="landing-navigation">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="@/assets/logo.png" alt="" />
        </a>
        <a
          role="button"
          :class="isActiveClass"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="isExpandedNavbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" :class="isActiveClass" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item is-flex" href="/"> Home </a>
          <a class="navbar-item is-flex" href="/debug"> Debug </a>
          <div class="navbar-item has-dropdown" :class="dropdownMenuClass" @click.prevent="isActiveDropdown">
            <a class="navbar-link is-flex"> More </a>
            <div class="navbar-dropdown">
              <div v-if="dropdownMenu">
                <a class="navbar-item is-flex"> About </a>
                <a class="navbar-item is-flex"> Jobs </a>
                <a class="navbar-item is-flex"> Contact </a>
                <hr class="navbar-divider" />
                <a class="navbar-item is-flex"> Report an issue </a>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light"> Log out </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isActive = ref(false)
const isActiveClass = ref('')
const dropdownMenu = ref(false)
const dropdownMenuClass = ref('')

const isActiveDropdown = () => {
  dropdownMenu.value = !dropdownMenu.value
  dropdownMenuClass.value = dropdownMenu.value ? 'is-active' : ''
}

const isExpandedNavbar = () => {
  isActive.value = !isActive.value
  isActiveClass.value = isActive.value ? 'is-active' : ''
}
</script>

<style scoped lang="scss">
.landing-navigation {
  position: relative;
}
</style>
