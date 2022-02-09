import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { Field } from '@/core/types'
import { FieldTypes } from '@/components/forms/Form/types'
import { ValidationRuleWithParams } from '@vuelidate/core'
import { cpf } from 'cpf-cnpj-validator'
import { isValid } from 'creditcard.js'

type Rules = {
  custom?: ValidationRuleWithParams
  card?: ValidationRuleWithParams
  cpf?: ValidationRuleWithParams
  required?: ValidationRuleWithParams
  minLength?: ValidationRuleWithParams
  maxLength?: ValidationRuleWithParams
  $lazy: boolean
}

/**
 * Mounts an object containing the field validation rules.
 *
 * @param { Field } field - group of properties to field representation.
 * @returns ValidationArgs
 */
// TODO: Fix typing
export default function mountFieldDependencyRules(field: Field): any {
  const rules: Rules = {
    $lazy: true
  }

  if (field.regex) {
    rules.custom = helpers.withMessage('O formato inserido é inválido.', helpers.regex(new RegExp(field.regex ?? '')))
  }

  if (field.type === FieldTypes.Card) {
    const checkCard = value => isValid(value)
    rules.card = helpers.withMessage('Número de cartão inválido.', checkCard)
  }

  if (field.type === FieldTypes.Cpf) {
    const checkCPF = value => cpf.isValid(value)
    rules.cpf = helpers.withMessage('CPF inválido.', checkCPF)
  }

  if (field.required) {
    rules.required = helpers.withMessage(`Esse campo é obrigatório.`, required)
  }

  if (field.minLength) {
    rules.minLength = helpers.withMessage(
      `O número mínimo de caracteres é ${field.minLength}.`,
      minLength(field.minLength)
    )
  }

  if (field.maxLength) {
    rules.maxLength = helpers.withMessage(
      `O número máximo de caracteres é ${field.maxLength}.`,
      maxLength(field.maxLength)
    )
  }

  return rules
}
