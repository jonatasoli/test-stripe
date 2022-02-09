import { API_ROUTES } from '@/core/services/api/enums'
import { ApiService } from '@/core/services/api'
import { Config } from '@/core/config'
import { Project } from '@/store/modules/Project/types'

/**
 * An API service, used to manipulate data from/in the Project related endpoints
 */
class ProjectService {
  /**
   * Retrieves the project settings from the API passing the current project namespace
   */
  public async getProjectSettingsByNamespace(): Promise<Project> {
    const namespace = getApplicationNamespace()
    console.log("namespace:", namespace)
    console.log("routes:", API_ROUTES.PROJECTS)
    const response = await ApiService.get(`/${API_ROUTES.PROJECTS}/${namespace}`)
    console.log("response:", response)
    return mapQueryResponseToModel(response)
  }
}

/**
 * Maps the Project endpoint response to the expected format.
 *
 * @param { object } response
 * @param { Project } response.data
 */
function mapQueryResponseToModel(response: { data: Project }): Project {
  const { data: project } = response
  project.theme = Config.getDefaultTheme()
  return project
}

/**
 *  Returns the current application namespace.
 */
function getApplicationNamespace(): string {
  return window.location.hostname.split('.')[0] || Config.getDefaultNamespace()
}

export default new ProjectService()
