import {Package, Declaration} from 'custom-elements-manifest'

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

export const getDeclarations = (data: Package | null) => {
  const res: Declaration[] = []
  data?.modules?.forEach((item) => item.declarations?.forEach((item) => res.push(item)))
  return res
}
