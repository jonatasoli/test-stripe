import Route from '@/core/services/api/types'

export interface Form {
  field: string | undefined
  value: string | undefined
}

export interface State {
  routes: Array<Route>
  form: Form
}
