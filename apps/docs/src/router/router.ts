import {GettingStartedTemplate} from '../pages'

type Pages = keyof typeof paths

export const paths = {
  'Getting Started': GettingStartedTemplate,
} as const

const pageList = Object.keys(paths) as Array<Pages>

type Store = {
  page: keyof typeof paths
}

export const setPage = (key: Pages) => {
  localStorage.currentPage = key
}
