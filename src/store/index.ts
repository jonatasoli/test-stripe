import { actions, dynamicGetters, mutations, state } from '@/store/reusable'
import Index from '@/views/Index.vue'
import LayoutModule from '@/store/modules/Layout'
import ProjectModule from '@/store/modules/Project'
import Route from '@/core/services/api/types'
import { State } from '@/store/modules/types'
import { createStore } from 'vuex'
import router from '@/router'

const store = createStore<State>({
  state: {
    routes: [],
    form: {
      field: '',
      value: ''
    }
  },
  mutations: {
    addRoutes(state, newRoutes: Array<Route>) {
      state.routes = [...state.routes, ...newRoutes]

      state.routes.forEach(route => {
        router.addRoute({
          ...route,
          redirect: ''
        })
      })
    },
    fillForm(state, value) {
      state.form = { ...state.form, ...value }
    }
  },
  getters: {
    routes: ({ routes }) => routes,
    formData: ({ form }) => form
  },
  actions: {
    async loadRoutes({ commit }) {
      const routes = [] // await API.client.get('/routes')

      routes.forEach(({ name, path }) => {
        commit('addRoutes', [
          {
            name,
            path,
            component: Index
          }
        ])
      })
    },
    addRoutes({ commit }, routes) {
      commit('addRoutes', routes)
    },
    fillForm({ commit }, value) {
      commit('fillForm', value)
    },

    addFormModule(_, formName) {
      this.registerModule(`module_${formName}`, {
        state,
        getters: dynamicGetters,
        mutations,
        actions,
        namespaced: true
      })
    }

    // addFormModule(context, formName: string, fields: Array<Field>) {
    //   // @ts-ignore
    //   this.registerModule(`module_${formName}`, {
    //     state,
    //     getters,
    //     mutations,
    //     namespaced: true,
    //   });
    // },
  },
  modules: {
    ProjectModule,
    LayoutModule
  }
})

export { LayoutModule, store, ProjectModule }
