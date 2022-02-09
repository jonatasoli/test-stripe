import { Theme } from '@/store/modules/Project/types'
import useEnv from '@/core/helpers/env'

class ConfigImpl {
  private _appBaseUrl!: string
  private _defaultAppName!: string
  private _defaultNamespace!: string
  private _appHost!: string
  private _apiHost!: string
  private _primaryColor!: string

  set(params: {
    appBaseUrl: string
    defaultAppName: string
    defaultNamespace: string
    appHost: string
    apiHost: string
    primaryColor: string
  }) {
    this._appBaseUrl = params.appBaseUrl
    this._defaultAppName = params.defaultAppName
    this._defaultNamespace = params.defaultNamespace
    this._appHost = params.appHost
    this._apiHost = params.apiHost
    this._primaryColor = params.primaryColor
  }

  getAppBaseUrl() {
    return this._appBaseUrl ?? useEnv('VITE_APP_BASE_URL')
  }

  getDefaultAppName() {
    return this._defaultAppName ?? useEnv('VITE_APP_DEFAULT_APP_NAME')
  }

  getDefaultNamespace() {
    return this._defaultNamespace ?? useEnv('VITE_APP_DEFAULT_NAMESPACE')
  }

  getAppHost() {
    return this._appHost ?? useEnv('VITE_APP_HOST')
  }

  getApiHost() {
    return this._apiHost ?? useEnv('VITE_API_HOST')
  }

  getPrimaryColor() {
    return this._primaryColor ?? useEnv('VITE_PRIMARY_COLOR')
  }

  getDefaultTheme(): Theme {
    return {
      primary: this.getPrimaryColor(),
      white: '',
      dark: '#283252',
      link: '#f38d07',
      primaryMedium: '#b4e4ce',
      primaryLight: '#f7fcfa',
      secondary: '#ff227d',
      accent: '#797bf2',
      accentMedium: '#d4b3ff',
      accentLight: '#b8ccff',
      success: 'green',
      info: 'blue',
      warning: 'orange',
      danger: 'red',
      purple: 'purple',
      blue: 'blue',
      green: 'green',
      yellow: 'yellow',
      orange: 'orange',
      lightText: '#a2a5b9',
      fadeGrey: '#ededed'
    }
  }
}
export const Config = new ConfigImpl()
