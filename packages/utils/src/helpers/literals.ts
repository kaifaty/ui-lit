import {createStyle} from './css-stylesheet.js'

/**
 * Simple miniize and for IDE support
 */
export const html = (strings: TemplateStringsArray, ...values: string[]) => {
  const len = strings.length
  let acc = ''
  for (let i = 0; i < len; i++) {
    acc += strings[i].replace(/(\n  )(\r  )(    )(\n)|(\r)/g, '')
    if (values[i]) {
      acc += values[i]
    }
  }
  return acc
}

export const css = (strings: TemplateStringsArray, ...values: string[]) => {
  const string = html(strings, ...values)
  return createStyle(string)
}

export const createTemplate = (str: string) => {
  const template = document.createElement('template')
  template.innerHTML = str
  return template
}
