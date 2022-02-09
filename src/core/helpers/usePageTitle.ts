import ProjectModule from '@/store/modules/Project'
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

/**
 * Changes the page tittle based on the app name.
 *
 * @param { string } title
 * @param { Store } store
 */
export function usePageTitle<S>(title: string, store: Store<S>): void {
  const project = getModule(ProjectModule, store)
  document.title = `${project.appName} | ${title}`
}
