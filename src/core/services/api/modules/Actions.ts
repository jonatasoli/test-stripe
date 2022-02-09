import { ApiService } from '@/core/services/api'

class ActionService {
  public async post(
    container_name: string | number,
    screen_action_name: string | number,
    object_id: string,
    data: Record<string, unknown>
  ): Promise<Record<string, any>> {
    const response = await ApiService.post(`/screens/${container_name}/${screen_action_name}/${object_id}`, data)
    return response.data
  }
}

export const ActionsService = new ActionService()
