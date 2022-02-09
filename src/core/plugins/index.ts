import { App } from 'vue'
import router from '@/router'
import { store } from '@/store'
import tabs from 'vue3-tabs'

const PLUGINS_LIST = [router, store, tabs]

/**
 * Initializes all the plugins before load the application.
 *
 * @param {App} app The vue app instance.
 */
function initializePlugins(app: App): void {
  PLUGINS_LIST.forEach(plugin => app.use(plugin))
}

export default initializePlugins
