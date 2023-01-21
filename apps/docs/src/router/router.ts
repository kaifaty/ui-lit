import {createStore} from '@kai/lit-store'
import {createSpaRouter} from '@kai/utils'

import {LitNavBurger} from '../../../src'
import {ButtonTemplate, CheckboxTemplate, DialogTemplate, RangeTemplate, TextfieldTemplate} from '../components'
import {GettingStartedTemplate,} from '../pages'


type Pages = keyof typeof paths

export const paths = {  
  'Getting Started': GettingStartedTemplate,
  'lit-range': RangeTemplate,
  'lit-dialog': DialogTemplate,
  'lit-button': ButtonTemplate,
  'lit-checkbox': CheckboxTemplate,
  'lit-textfield': TextfieldTemplate,
} as const

const pageList = Object.keys(paths) as Array<Pages>

type Store = {
  page: keyof typeof paths
}

const route = createStore<Store>({
  page: localStorage.currentPage || '/'
})


export const setPage = (key: Pages) => {
    document.querySelector<LitNavBurger>('lit-nav-burger')?.close()
    localStorage.currentPage = key
    route.page = key
}

export const getPage = () => route.page
export const getPageContent = () => paths[route.page]

createSpaRouter<Array<Pages>>(setPage, pageList, 'Getting Started')