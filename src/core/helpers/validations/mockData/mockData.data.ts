export const CPF_FIELD = {
  name: 'cpf_cpf',
  label: 'fields',
  type: 'cpf',
  placeholder: 'CPF',
  hint: 'Digite o seu CPF'
}

export const CARD_FIELD = {
  name: 'card_card',
  label: 'fields',
  type: 'card',
  placeholder: 'card',
  hint: 'Digite o seu card'
}

export const FIELD_WITH_MULTIPLE_VALIDATIONS = {
  name: 'field__field',
  label: 'fields',
  type: 'text',
  placeholder: 'Nome do field',
  hint: 'Digite o nome do field',
  required: true,
  regex: '^[a-zA-Z]*$',
  minLength: 5,
  maxLength: 10
}

export const FIELD_WITH_REGEX_VALIDATION = {
  name: 'field__field',
  label: 'fields',
  type: 'text',
  placeholder: 'Nome do field',
  hint: 'Digite o nome do field',
  regex: '^[a-zA-Z]*$'
}

export const FIELD_WITH_REQUIRED_VALIDATION = {
  name: 'field__field',
  label: 'fields',
  type: 'text',
  placeholder: 'Nome do field',
  hint: 'Digite o nome do field',
  required: true
}

export const FIELD_WITH_MINLENGTH_VALIDATION = {
  name: 'field__field',
  label: 'fields',
  type: 'text',
  placeholder: 'Nome do field',
  hint: 'Digite o nome do field',
  minLength: 5
}

export const FIELD_WITH_MAXLENGTH_VALIDATION = {
  name: 'field__field',
  label: 'fields',
  type: 'text',
  placeholder: 'Nome do field',
  hint: 'Digite o nome do field',
  maxLength: 5
}
