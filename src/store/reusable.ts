import { Field } from 'vee-validate'

export interface Field {
  name: string
  initialValue: string
  value: string
  type: string
}

export interface FillFieldPayload {
  fieldName: string
  value: string
}

interface Action {
  id: number
  url: string
}

interface FormState {
  name: string
  isValid: boolean
  action: Array<Action>
  fields: Array<Field>
}

export const actions = {
  loadFormFields(context, payload: Array<Field>) {
    context.commit('loadFormFields', payload)
  },

  fillField(context, payload: FillFieldPayload) {
    context.commit('fillField', payload)
  },

  async sendFormData({ state }, { id }: Action) {
    const { fields } = state

    const data = { actionId: id, screenId: id, data: {} }
    fields.forEach((field: Field) => {
      data.data[field.name] = field.value
    })

    // await API.client.post(url, data)
  }
}

export const dynamicGetters = {
  formDefinition: (state: FormState) => {
    return state
  },
  // fieldDefinition: (state: FormState) => (fieldName: string) => {
  //   return state.fields.find(field => field.name === fieldName)
  // },
  formFields: ({ fields }: FormState) => {
    return fields
  }
}

export const mutations = {
  loadFormFields(state: FormState, fields: Array<Field>) {
    state.fields = fields
  },

  fillField(state: FormState, { fieldName, value }: FillFieldPayload) {
    state.fields = state.fields.map((field): Field => {
      return field.name === fieldName ? { ...field, value } : field
    })
  }
}

export const state = (): FormState => {
  return {
    name: '',
    isValid: false,
    action: [],
    fields: []
  }
}
