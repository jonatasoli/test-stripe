import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { ApiService } from '@/core/services/api'
import { AxiosRequestConfig } from 'axios'
import JwtService from './JwtService'

export interface User {
  name: string
  surname: string
  email: string
  password: string
  api_token: string
}

export interface UserAuthInfo {
  errors: unknown
  user: User
  isAuthenticated: boolean
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {}
  user = {} as User
  isAuthenticated = !!JwtService.getToken()

  /**
   * Get current user object
   *
   * @returns {User}
   */
  get currentUser(): User {
    return this.user
  }

  /**
   * Verify user authentication
   *
   * @returns {boolean}
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated
  }

  /**
   * Get authentification errors
   *
   * @returns {Array}
   */
  get getErrors() {
    return this.errors
  }

  @Mutation
  setError(error) {
    this.errors = error
  }

  @Mutation
  setAuth(user) {
    this.isAuthenticated = true
    this.user = user
    this.errors = []
    JwtService.saveToken(this.user.api_token)
  }

  @Mutation
  setUser(user) {
    this.user = user
  }

  @Mutation
  setPassword(password: string) {
    this.user.password = password
  }

  @Mutation
  logOut() {
    this.isAuthenticated = false
    this.user = {} as User
    this.errors = []
    JwtService.destroyToken()
  }

  @Action
  login(credentials) {
    const params = {
      params: {
        ...credentials
      }
    }
    return new Promise<void>((resolve, reject) => {
      ApiService.get('login', params)
        .then(({ data }) => {
          this.setAuth(data)
          resolve()
        })
        .catch(({ response }) => {
          this.setError(response.data.errors)
          reject()
        })
    })
  }

  @Action
  logout() {
    this.logOut()
  }

  @Action
  register(credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post('register', credentials)
        .then(({ data }) => {
          this.setAuth(data)
          resolve()
        })
        .catch(({ response }) => {
          this.setError(response.data.errors)
          reject()
        })
    })
  }

  @Action
  forgotPassword(payload) {
    const params = {
      params: {
        ...payload
      }
    }
    return new Promise<void>((resolve, reject) => {
      ApiService.get('forgot_password', params)
        .then(({ data }) => {
          this.setAuth(data)
          resolve()
        })
        .catch(({ response }) => {
          this.setError(response.data.errors)
          reject()
        })
    })
  }

  @Action
  verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      const params = {
        params: {
          token: JwtService.getToken()
        }
      }
      ApiService.get('verify_token', params as AxiosRequestConfig)
        .then(({ data }) => {
          this.setAuth(data)
        })
        .catch(({ response }) => {
          this.setError(response.data.errors)
          this.logOut()
        })
    } else {
      this.logOut()
    }
  }

  // @Action
  // updateUser(payload) {
  //   ApiService.setHeader();
  //   return new Promise<void>((resolve, reject) => {
  //     ApiService.post("update_user", payload)
  //       .then(({ data }) => {
  //         this.context.commit(setUser, data);
  //         resolve();
  //       })
  //       .catch(({ response }) => {
  //         this.context.commit(setError, response.data.errors);
  //         reject();
  //       });
  //   });
  // }
}
