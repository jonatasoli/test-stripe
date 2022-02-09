import { Action, Module, Mutation, VuexModule, config } from 'vuex-module-decorators'
import { Config } from '@/core/config'
import { Project, Route, Theme } from '@/store/modules/Project/types'
import { CSSProperties } from 'vue'
import { ProjectService } from '@/core/services/api'
import { useStore } from 'vuex'

config.rawError = true

@Module({ name: 'project', store: useStore() })
export default class ProjectModule extends VuexModule {
  private namespace
  private theme: Theme = Config.getDefaultTheme()
  private applicationName: string = Config.getDefaultAppName()
  // We can't use `routes` here because it breaks the code on runtime
  private _routes: Route[] = []

  get themeColors(): Theme {
    return this.theme
  }

  get primaryColor(): string {
    return this.theme.primary
  }

  get allRoutes(): Route[] {
    return this._routes
  }

  get appName(): string {
    return this.applicationName
  }

  get formattedColors(): CSSProperties {
    return {
      '--white': this.theme.white,
      '--primary': this.theme.primary,
      '--dark': this.theme.dark,
      '--link': this.theme.link,
      '--info': this.theme.info,
      '--success': this.theme.success,
      '--warning': this.theme.warning,
      '--danger': this.theme.danger
    }
  }

  @Mutation
  loadProject({ name, namespace, routes, theme }: Project) {
    this.namespace = namespace
    this.theme = theme
    this.applicationName = name
    this._routes = routes
  }

  @Action({ commit: 'loadProject' })
  public async loadProjectSettingsFromAPI(): Promise<Project> {
    return await ProjectService.getProjectSettingsByNamespace()
  }
}
