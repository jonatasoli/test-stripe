import LayoutModule from '@/store/modules/Layout'
import ProjectModule from '@/store/modules/Project'
import { Route } from '@/store/modules/Project/types'
import { Router } from 'vue-router'
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import router from '@/router'

class LayoutService {
  readonly layoutModule
  readonly projectModule
  private router: Router
  private store: Store<any>

  constructor(router: Router, store: Store<any>) {
    this.store = store
    this.router = router
    this.layoutModule = getModule(LayoutModule, store)
    this.projectModule = getModule(ProjectModule, store)
  }

  public async mount(): Promise<void> {
    try {
      this.setLoader(true)
      await this.initLayout()
      await this.initRoutes()
    } catch (err) {
      console.error(err)
      await router.push({ name: 'error.internal' })
    } finally {
      this.setLoader(false)
    }
  }

  private setLoader(state: boolean) {
    this.layoutModule.setLoadingState(state)
  }

  private async initLayout(): Promise<void> {
    await this.projectModule.loadProjectSettingsFromAPI()
  }

  private async initRoutes(): Promise<void> {
    const routes: Array<Route> = this.projectModule.allRoutes

    // Adding the routes dynamically
    routes.forEach(({ name, settings: { private: isPrivate }, url }) => {
      router.addRoute({ path: url, name, component: import('@/views/Render.vue'), meta: { isPrivate } })
    })

    // Checking the current route and replacing it
    if (!this.router.currentRoute.value.matched.length) {
      await this.router.replace(this.router.currentRoute.value.fullPath)
    }

    // Checking the current route and returning it to #404
    if (!this.router.currentRoute.value.matched.length) {
      await this.router.replace({ name: 'error.not-found' })
    }
  }
}

export default LayoutService
