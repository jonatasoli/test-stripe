import { ApiService } from '@/core/services/api'

/**
 * Initializes all the services when loading the application
 */
function initializeServices(): void {
  ApiService.init()
}

export { LayoutService } from '@/core/services/layout'
export default initializeServices
