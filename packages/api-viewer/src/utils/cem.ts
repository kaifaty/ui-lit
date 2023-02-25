import {Package, Declaration, ClassMethod, CustomElementDeclaration} from 'custom-elements-manifest'

export type AttrPropData = {
  name: string
  default: string
  type: string
  description?: string
  hasProp: boolean
  hasAttr: boolean
}

const isClass = (declaration: Declaration): declaration is CustomElementDeclaration => {
  return 'customElement' in declaration && declaration.customElement
}

export const loadCEMJson = async (src: string): Promise<Package | null> => {
  if (!src) {
    return null
  }
  try {
    const res = await fetch(src)
    const result = await res.json()

    return result
  } catch (e) {
    console.error(`Erorr loading CEM.json at - '${src}'`, (e as Error).message)
    return null
  }
}
export const getCustomElements = (data: Package | null) => {
  const res: Record<string, CustomElementDeclaration> = {}
  data?.modules.forEach((item) =>
    item.declarations.forEach((dec) => {
      if (isClass(dec)) {
        res[dec.name] = dec
      }
    }),
  )
  return res
}
export const getModuleNames = (data: Package | null) => {
  return Object.keys(getCustomElements(data)).sort()
}

export const getSelectedModule = (data: Package | null, moduleName: string) => {
  return getCustomElements(data)[moduleName]
}

export const hasUnnamedSlot = (data: CustomElementDeclaration) => {
  return Boolean(data.slots?.find((item) => item.name === ''))
}

export const getAttrAndProps = (data: Package | null, moduleName: string) => {
  const declaration = getSelectedModule(data, moduleName)

  if (declaration) {
    const data: Record<string, AttrPropData> = {}
    declaration.attributes.forEach((item) => {
      const withProp = item.description.includes('*withprop*')
      data[item.name] = {
        name: item.name,
        default: item.default,
        description: item.description.replace(`*withprop*`, ''),
        type: item.type?.text,

        hasProp: withProp,
        hasAttr: true,
      }
    })
    declaration.members.forEach((item) => {
      if (item.kind === 'field') {
        if (data[item.name]) {
          data[item.name].hasProp = true
        } else {
          data[item.name] = {
            name: item.name,
            default: item.default,
            type: item.type?.text,
            description: item.description,
            hasProp: true,
            hasAttr: false,
          }
        }
      }
    })
    return data
  }
  return {}
}

export const getMethods = (data: Package | null, moduleName: string): ClassMethod[] => {
  const declaration = getSelectedModule(data, moduleName)

  return (declaration.members?.filter((item) => item.kind === 'method') as ClassMethod[]) ?? []
}

export const getSlots = (data: Package | null, moduleName: string) => {
  const declaration = getSelectedModule(data, moduleName)
  return declaration.slots ?? []
}

export const getCSSProps = (data: Package | null, moduleName: string) => {
  const declaration = getSelectedModule(data, moduleName)
  return (declaration.cssProperties ?? []).sort((a, b) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  })
}
