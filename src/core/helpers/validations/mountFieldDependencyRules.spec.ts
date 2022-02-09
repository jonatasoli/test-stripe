import {
  CARD_FIELD,
  CPF_FIELD,
  FIELD_WITH_MAXLENGTH_VALIDATION,
  FIELD_WITH_MINLENGTH_VALIDATION,
  FIELD_WITH_MULTIPLE_VALIDATIONS,
  FIELD_WITH_REGEX_VALIDATION,
  FIELD_WITH_REQUIRED_VALIDATION
} from '@/core/helpers/validations/mockData/mockData.data'
import validation from './mountFieldDependencyRules'

describe('Create validations', () => {
  test('Field type cpf', () => {
    const rules = validation(CPF_FIELD)
    expect(rules.cpf.$validator('3212312312231')).toEqual(false)
    expect(rules.cpf.$validator('11144477735')).toEqual(true)
  })

  test('Field type card', () => {
    const rules = validation(CARD_FIELD)
    expect(rules.card.$validator('4111-1111-1111-1111')).toEqual(true)
    expect(rules.card.$validator('4111-1111-1111-1113')).toEqual(false)
  })

  test('Field with required validation', () => {
    const rules = validation(FIELD_WITH_REQUIRED_VALIDATION)
    expect(rules.required.$validator('')).toEqual(false)
    expect(rules.required.$validator('required')).toEqual(true)
  })

  test('Field with maxlength validation', () => {
    const rules = validation(FIELD_WITH_MAXLENGTH_VALIDATION)
    expect(rules.maxLength.$validator('123456789')).toEqual(false)
    expect(rules.maxLength.$validator('123')).toEqual(true)
  })

  test('Field with minLength validation', () => {
    const rules = validation(FIELD_WITH_MINLENGTH_VALIDATION)
    expect(rules.minLength.$validator('123456789')).toEqual(true)
    expect(rules.minLength.$validator('123')).toEqual(false)
  })

  test('Field with regex validation', () => {
    const rules = validation(FIELD_WITH_REGEX_VALIDATION)
    expect(rules.custom.$validator('123456789')).toEqual(false)
    expect(rules.custom.$validator('regex')).toEqual(true)
  })

  test('Field with regex, minLength, maxlength and required validations', () => {
    const rules = validation(FIELD_WITH_MULTIPLE_VALIDATIONS)
    expect(rules.custom.$validator('121212')).toEqual(false)
    expect(rules.minLength.$validator('multiple')).toEqual(true)
    expect(rules.maxLength.$validator('multiple tests')).toEqual(false)
    expect(rules.required.$validator('')).toEqual(false)
  })
})
