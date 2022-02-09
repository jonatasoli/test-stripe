import { computed } from 'vue'
import store from '@/store'

/**
 * Set the aside display
 *
 * @returns {boolean}
 */
export const asideDisplay = computed(() => {
  return store.getters.layoutConfig('aside.display') === true
})

/**
 * Check if the aside menu is enabled
 *
 * @returns {boolean}
 */
export const asideEnabled = computed(() => {
  return !!store.getters.layoutConfig('aside.display')
})

/**
 * Set the aside menu icon type
 *
 * @returns {string}
 */
export const asideMenuIcons = computed(() => {
  return store.getters.layoutConfig('aside.menuIcon')
})

/**
 * aside secondary display
 *
 * @returns {boolean}
 */
export const asideSecondaryDisplay = computed(() => {
  return store.getters.layoutConfig('aside.secondaryDisplay')
})

/**
 * Set the aside theme
 *
 * @returns {string}
 */
export const asideTheme = computed(() => {
  return store.getters.layoutConfig('aside.theme')
})

/**
 * Returns layout config
 *
 * @returns {object}
 */
export const config = computed(() => {
  return store.getters.layoutConfig()
})

/**
 * Check if container width is fluid
 *
 * @returns {boolean}
 */
export const contentWidthFluid = computed(() => {
  return store.getters.layoutConfig('content.width') === 'fluid'
})

/**
 * Set the sidebar display
 *
 * @returns {boolean}
 */
export const displaySidebar = computed(() => {
  return store.getters.layoutConfig('sidebar.display')
})

/**
 * Check if footer container is fluid
 *
 * @returns {boolean}
 */
export const footerWidthFluid = computed(() => {
  return store.getters.layoutConfig('footer.width') === 'fluid'
})

/**
 * Returns header fixed on desktop
 *
 * @returns {boolean}
 */
export const headerFixed = computed(() => {
  return store.getters.layoutConfig('header.fixed.desktop')
})

/**
 * Returns header fixed on tablet and mobile
 *
 * @returns {boolean}
 */
export const headerFixedOnMobile = computed(() => {
  return store.getters.layoutConfig('header.fixed.tabletAndMobile')
})

/**
 * Returns header left part type
 *
 * @returns {string}
 */
export const headerLeft = computed(() => {
  return store.getters.layoutConfig('header.left')
})

/**
 * Set the header menu icon type
 *
 * @returns {string}
 */
export const headerMenuIcons = computed(() => {
  return store.getters.layoutConfig('header.menuIcon')
})

/**
 * Check if header container is fluid
 *
 * @returns {boolean}
 */
export const headerWidthFluid = computed(() => {
  return store.getters.layoutConfig('header.width') === 'fluid'
})

/**
 * Check if the page loader is enabled
 *
 * @returns {boolean}
 */
export const loaderEnabled = computed(() => {
  return store.getters.layoutConfig('loader.display')
})

/**
 * Page loader logo image
 *
 * @returns {string}
 */
export const loaderLogo = computed(() => {
  return import.meta.env.BASE_URL + store.getters.layoutConfig('loader.logo')
})

/**
 * aside minimization enabled
 *
 * @returns {boolean}
 */
export const minimizationEnabled = computed(() => {
  return store.getters.layoutConfig('aside.minimize')
})

/**
 * aside secondary minimized by default
 *
 * @returns {boolean}
 */
export const minimizedAsideSecondary = computed(() => {
  return store.getters.layoutConfig('aside.minimized')
})

/**
 * Set the subheader display
 *
 * @returns {boolean}
 */
export const subheaderDisplay = computed(() => {
  return store.getters.layoutConfig('toolbar.display')
})

/**
 * Dark theme logo image
 *
 * @returns {string}
 */
export const themeDarkLogo = computed(() => {
  return store.getters.layoutConfig('main.logo.dark')
})

/**
 * Light theme logo image
 *
 * @returns {string}
 */
export const themeLightLogo = computed(() => {
  return store.getters.layoutConfig('main.logo.light')
})

/**
 * Set the toolbar display
 *
 * @returns {boolean}
 */
export const toolbarDisplay = computed(() => {
  return store.getters.layoutConfig('toolbar.display')
})

/**
 * Check if toolbar width is fluid
 *
 * @returns {boolean}
 */
export const toolbarWidthFluid = computed(() => {
  return store.getters.layoutConfig('toolbar.width') === 'fluid'
})
