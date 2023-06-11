import type {Package} from 'custom-elements-manifest/schema'

import {withProps, definable, createGetParams, html, stylable, createTemplate} from '@ui-wc/utils'
import {
  AttrPropData,
  getMethods,
  getSlots,
  getAttrAndProps,
  hasUnnamedSlot,
  getSelectedModule,
  getModuleNames,
  getCSSProps,
  loadCEMJson,
} from './utils/cem'

type Props = {
  isLoading: boolean
  data: Package | null
  selectedName: string
  selectedCategory: Categories
  src: string | null
  previewElement: (HTMLElement & Record<string, unknown>) | null
}

type ApiViewerElement = HTMLElement & Props

export const CATEGORIES = [
  ['attributes', 'Attrs & Props'],
  ['members', 'Methods'],
  ['slots', 'Slots'],
  ['cssProperties', 'Css props'],
  ['cssParts', 'Css parts'],
  ['events', 'Events'],
] as const

export type Categories = typeof CATEGORIES[number][0]

const formatName = (v: string) => {
  return v.replace('Wc', '')
}

const STORAGE_KEY = 'wc-apiviewer-'
const lastName = localStorage.getItem(STORAGE_KEY + 'name')
const getParam = createGetParams({attribute: true, reflect: true})
const getStateProp = createGetParams({})
const getTarget = (target: HTMLElement) => target as ApiViewerElement

const removeQuotes = (str: string) => {
  return str.replaceAll(`'`, '').replaceAll(`"`, '')
}
const checkmark = (condition?: boolean) => {
  return condition ? html`<wc-icon icon="checkmark"></wc-icon>` : ''
}
const save2storage = (src: string, data: Package) => {
  localStorage.setItem(STORAGE_KEY + src, JSON.stringify(data))
}
const restore = (src: string) => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY + src)) as Package
  } catch {
    return null
  }
}

const getValueChooser = (data: AttrPropData) => {
  const type = data?.type
  if (!type) {
    return
  }
  if (type.toLowerCase() === 'boolean') {
    const isUnchecked = data.default === 'false' || !data.default
    return `
    <wc-checkbox 
      class = "changer" 
      data-type = "boolean"
      data-name = "${data.name}"
      data-hasProp = "${data.hasProp.toString()}"
      ${isUnchecked ? '' : 'checked'} 
    ></wc-checkbox>`
  }
  if (type.includes('string')) {
    const value = data.default === 'null' ? '' : data.default
    return html`<input
      value="${value}"
      class="changer"
      data-type="string"
      data-name="${data.name}"
      data-hasProp="${data.hasProp.toString()}"
    />`
  }
  if (type.includes(`'`) || type.includes(`"`)) {
    const values = removeQuotes(data.type).split('|')
    const value = removeQuotes(data.default)
    return html`<select
      value="${value}"
      class="changer"
      data-type="string"
      data-name="${data.name}"
      data-hasProp="${data.hasProp.toString()}"
    >
      ${values
        .map((item) => {
          item = item.trim()
          return `<option value = "${item}" ${item === value ? 'selected' : ''}>${item}</option>`
        })
        .join('')}
    </select>`
  }
  return ''
}

const renderNames = (target: ApiViewerElement) => {
  target.shadowRoot.querySelector('#names').innerHTML = getModuleNames(target.data)
    .map((name) => {
      return html`<wc-tree-item value="${name}">${formatName(name)}</wc-tree-item>`
    })
    .join('')
}

const getContent = (description: string) => {
  return description.match(/(#content[A-Za-z0-9 \n\r\\\<\>\-\/\"\'\=]*#content)/g)?.[0]?.replaceAll('#content', '') ?? ''
}

const renderElement = (target: ApiViewerElement) => {
  const selectedModule = getSelectedModule(target.data, target.selectedName)
  const tag = selectedModule?.tagName
  if (tag) {
    const content = getContent(selectedModule.description ?? '')
    console.log({content, d: selectedModule.description})
    const template = createTemplate(`<${tag}>${content}</${tag}>`)
    const element = (template.content.cloneNode(true) as HTMLElement).querySelector(tag) as HTMLElement | null
    if (hasUnnamedSlot(selectedModule)) {
      element.innerText = formatName(selectedModule.name)
    }
    target.previewElement = element as HTMLElement & Record<string, unknown>
  }
}

const renderMethods = (target: ApiViewerElement) => {
  const data = getMethods(target.data, target.selectedName)
  const content = data
    .map((item) => {
      return html`<tr>
        <td><span class="highlight">${item.name}</span></td>
        <td class="">${item.description}</td>
      </tr>`
    })
    .join('')

  const result = html`<table>
    <tr>
      <th class="left">Name</th>
      <th class="left">Description</th>
    </tr>
    ${content}
  </table>`
  target.shadowRoot.querySelector('#category-content').innerHTML = result
}

const renderAttrsProps = (target: ApiViewerElement) => {
  const data = getAttrAndProps(target.data, target.selectedName)
  const keys = Object.keys(data).sort((a, b) => {
    if (data[a].type === 'boolean' && data[b].type !== 'boolean') return -1
    if (data[a].type !== 'boolean' && data[b].type === 'boolean') return 1

    if (data[a].type > data[b].type) return 1
    if (data[a].type < data[b].type) return -1
    if (a > b) return 1
    if (a < b) return -1
    return 0
  }) as [keyof typeof data]

  const content = keys
    .map((key) => {
      const item = data[key]

      return html`<tr>
        <td class=""><span class="highlight">${item.name}</span></td>
        <td class="default">${checkmark(item.hasProp)}</td>
        <td>${item.description}</td>
        <td>${getValueChooser(item)}</td>
      </tr>`
    })
    .join('')
  const result = html`<table>
    <tr>
      <th class="left">Name</th>
      <th class="left">Has prop</th>
      <th class="left">Description</th>
      <th class="left">Default / Current</th>
    </tr>
    ${content}
  </table>`

  target.shadowRoot.querySelector('#category-content').innerHTML = result
}

const renderSlots = (target: ApiViewerElement) => {
  const slots = getSlots(target.data, target.selectedName)
  const content = slots
    .map((item) => {
      return html`<tr>
        <td><span class="highlight">${item.name ? item.name : '(default)'}</span></td>
        <td>${item.description}</td>
        <td>
          <input
            class="changer"
            data-type="slot"
            data-name="${item.name}"
            value="${item.name ? '' : formatName(target.selectedName)}"
          />
        </td>
      </tr>`
    })
    .join('')

  const result = html`<table>
    <tr>
      <th class="left">Name</th>
      <th class="left">Description</th>
      <th>Current value</th>
    </tr>
    ${content}
  </table>`

  target.shadowRoot.querySelector('#category-content').innerHTML = result
}

const renderCSSProps = (target: ApiViewerElement) => {
  const props = getCSSProps(target.data, target.selectedName)
  const content = props
    .map((item) => {
      return html`<tr>
        <td><span class="highlight">${item.name}</span></td>
        <td>${item.description}</td>
        <td><input class="changer" data-type="css" data-name="${item.name}" value="${item.default}" /></td>
      </tr>`
    })
    .join('')

  const result = html`<table>
    <tr>
      <th class="left">Name</th>
      <th class="left">Description</th>
      <th class="left">Default / Current</th>
    </tr>
    ${content}
  </table>`

  target.shadowRoot.querySelector('#category-content').innerHTML = result
}

const renderCategory = (target: ApiViewerElement) => {
  const cat = target.selectedCategory

  if (cat === 'attributes') {
    return renderAttrsProps(target)
  }
  if (cat === 'members') {
    return renderMethods(target)
  }
  if (cat === 'slots') {
    return renderSlots(target)
  }
  if (cat === 'cssProperties') {
    return renderCSSProps(target)
  }
}

const onDataChange = (target: ApiViewerElement) => {
  renderNames(target)
  renderCategory(target)
  renderElement(target)
}

/**
 * Props
 */
const isLoading = getStateProp<boolean>('isLoading', false)
const data = getStateProp<Package | null>('data', null)

const element = getStateProp('previewElement', null, {
  set(taget, _, value) {
    queueMicrotask(() => {
      const preview = taget.shadowRoot.querySelector('#preview')
      preview.innerHTML = ''
      preview.append(value)
    })
    return true
  },
})

const selectedName = getParam<string>('selectedName', lastName, {
  set(_target, _, value) {
    const target = getTarget(_target)
    if (value) {
      localStorage.setItem(STORAGE_KEY + 'name', value)
      queueMicrotask(() => {
        target.shadowRoot.querySelector('#selectedName').textContent = formatName(value)
        onDataChange(target)
      })
    }

    return true
  },
})

const selectedCategory = getParam<Categories>('selectedCategory', CATEGORIES[0][0], {
  set(_target, _, value) {
    const target = getTarget(_target)
    if (value) {
      queueMicrotask(() => {
        target.shadowRoot.querySelectorAll('.cat').forEach((item) => {
          item.removeAttribute('selected')
        })
        target.shadowRoot.querySelector(`.cat[data-value="${value}"]`)?.setAttribute('selected', '')
        renderCategory(target)
      })
    }

    return true
  },
})

const srcParam = getParam<null | string>('src', null, {
  set(_target, _, value) {
    const target = _target as ApiViewerElement
    target.isLoading = true
    const restored = restore(value)
    if (restored) {
      queueMicrotask(() => {
        onDataChange(target)
        target.shadowRoot.querySelector('wc-treeview').value = lastName
      })
    }

    loadCEMJson(value).then((res) => {
      console.log(res)
      target.data = res
      if (res) {
        onDataChange(target)
        save2storage(value, res)
      }
      target.isLoading = false
    })
    return true
  },
})

const Base = stylable(definable(HTMLElement), {}, '--wc-apiviewer-')

export const BaseApiViewer = withProps<Props, typeof Base>(Base, [
  isLoading,
  element,
  selectedCategory,
  selectedName,
  data,
  srcParam,
])
