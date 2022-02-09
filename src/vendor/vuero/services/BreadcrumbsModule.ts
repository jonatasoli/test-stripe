import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

interface Breadcrumb {
  title: string
  pageBreadcrumbPath: Array<string>
}

interface StoreInfo {
  breadcrumbs: Breadcrumb
}

@Module
export default class BreadcrumbsModule extends VuexModule implements StoreInfo {
  breadcrumbs = {} as Breadcrumb

  /**
   * Get breadcrumb object for current page
   *
   * @returns {Breadcrumb}
   */
  get getBreadcrumbs(): Breadcrumb {
    return this.breadcrumbs
  }

  /**
   * Get breadcrumb array for current page
   *
   * @returns {Array<string>}
   */
  get pageBreadcrumbPath(): Array<string> {
    return this.breadcrumbs.pageBreadcrumbPath
  }

  /**
   * Get current page title
   *
   * @returns {string}
   */
  get pageTitle(): string {
    return this.breadcrumbs.title
  }

  @Mutation
  setBreadcrumbMutation(payload) {
    this.breadcrumbs = payload
  }

  @Action
  setBreadcrumbAction(payload) {
    this.setBreadcrumbMutation(payload)
  }
}
