import type {TValidationMessages} from '@ui-wc/types'

export const defaultValidity = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
}
export const defaultValidationMessages: TValidationMessages = {
  badInput: {
    en: 'Bad input',
    ru: 'Неверный ввод',
  },
  customError: {
    en: 'Custom error',
    ru: 'Кастомная ошибка',
  },
  patternMismatch: {
    en: 'Pattern ${pattern} error',
    ru: 'Ошибка шаблона: ${pattern}',
  },
  rangeOverflow: {
    en: 'Value must be less then ${max}',
    ru: 'Значение должно быть меньше ${max}',
  },
  rangeUnderflow: {
    en: 'Value must be more then ${min}',
    ru: 'Значение должно быть больше ${min}',
  },
  stepMismatch: {
    en: 'Value must be in step of ${step}',
    ru: 'Значение должно быть с шагом ${step}',
  },
  tooLong: {
    en: 'Value is too long',
    ru: 'Значение слишком длинное',
  },
  tooShort: {
    en: 'Value is too short',
    ru: 'Значение слишком короткое',
  },
  valueMissing: {
    en: 'Value is required',
    ru: 'Значение не может быть пустым',
  },
  typeMismatch: {
    en: 'Type mismatch',
    ru: 'Ошибка типов',
  },
}
