import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Error } from '@/store/modules/Layout/types'
import { useStore } from 'vuex'

@Module({ name: 'Layout', store: useStore() })
export default class LayoutModule extends VuexModule {
  /**
   * Overlay Loading state.
   */
  private isLoadingLayout = false

  /**
   * Returns the current isLoading value.
   *
   * @returns {boolean}
   */
  get isLoading(): boolean {
    return this.isLoadingLayout
  }

  /**
   * Changes the loading state value.
   *
   * @param {boolean} state - the new isLoading value
   */
  @Mutation
  setLoadingState(state: boolean): void {
    this.isLoadingLayout = state
  }

  /**
   * Error Handling
   * ------------------------------------------------------------------------- *
   */
  private error: Error = {}

  get currentError(): Error {
    return this.error
  }

  @Mutation
  setErrorData(error: Error): void {
    this.error = error
  }

  @Action({ commit: 'setErrorData' })
  setError(error: Error): Error {
    return error
  }

  @Action({ commit: 'setErrorData' })
  resetError(): Error {
    return {}
  }
}
