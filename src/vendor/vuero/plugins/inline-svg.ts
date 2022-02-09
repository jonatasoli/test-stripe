import { App } from 'vue'
import InlineSvg from 'vue-inline-svg'

/**
 * Initialize Inline-Svg component
 *
 * @param {App<Element>} app
 */
export function initInlineSvg(app: App<Element>) {
  app.component('InlineSvg', InlineSvg)
}
