import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface StoreInfo {
  classes: {
    header?: Array<string>
    headerContainer?: Array<string>
    headerMobile?: Array<string>
    headerMenu?: Array<string>
    aside?: Array<string>
    asideMenu?: Array<string>
    asideToggle?: Array<string>
    toolbar?: Array<string>
    toolbarContainer?: Array<string>
    content?: Array<string>
    contentContainer?: Array<string>
    footerContainer?: Array<string>
    sidebar?: Array<string>
    pageTitle?: Array<string>
  }
}

@Module
export default class BodyModule extends VuexModule implements StoreInfo {
  classes = {}

  /**
   * Get current page title
   *
   * @returns {string}
   */
  get getClasses() {
    return position => {
      if (typeof position !== 'undefined') {
        return this.classes[position]
      }
      return this.classes
    }
  }

  @Mutation
  setClassnameByPosition(payload) {
    const { className, position } = payload
    if (!this.classes[position]) {
      this.classes[position] = []
    }
    this.classes[position].push(className)
  }

  @Action
  addBodyClassname(className) {
    document.body.classList.add(className)
  }

  @Action
  removeBodyClassname(className) {
    document.body.classList.remove(className)
  }

  @Action
  addBodyAttribute(payload) {
    const { qulifiedName, value } = payload
    document.body.setAttribute(qulifiedName, value)
  }

  @Action
  removeBodyAttribute(payload) {
    const { qulifiedName } = payload
    document.body.removeAttribute(qulifiedName)
  }

  @Action
  addClassname(payload) {
    this.setClassnameByPosition(payload)
  }
}
