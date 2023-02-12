import glob from 'glob'
import {readFile, writeFile} from 'fs'
import {checkboxCCSVarsMap, CHECKBOX_PREFIX} from '@ui-lit/checkbox/src/styles.map'
/*
import {
  buttonCCSVarsMap,
  PREFIX as buttonPrefix,
} from "../src/components/button/styles.keys";
import {
  checkboxCCSVarsMap,
  PREFIX as checkboxPrefix,
} from "../src/components/checkbox/styles.keys";
*/
const Files = {
  //button: { map: buttonCCSVarsMap, prefix: buttonPrefix },
  checkbox: {map: checkboxCCSVarsMap, prefix: CHECKBOX_PREFIX},
} as const

const getKeys = (data: Record<string, string | readonly [string | number, string]>, preffix: string) =>
  Object.keys(data)
    .map((a) => [
      preffix + a,
      Array.isArray(data[a]) ? data[a][0] : data[a],
      Array.isArray(data[a]) ? data[a][1] : a,
    ])
    .sort((a, b) => (a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1))

const asyncRead = (path: string) => new Promise<string>((r) => readFile(path, 'utf-8', (_, data) => r(data)))

const getComponentPath = (name: string) =>
  new Promise<string[]>((r) =>
    glob(`../../packages/components/**/${name}.component.ts`, {}, (_, data) => r(data)),
  )

const getFilesData = async () => {
  return Promise.all(
    Object.keys(Files).map(async (name) => {
      const list = await getComponentPath(name)
      const file = list[0]
      const data = await asyncRead(file)
      let hasReplacement = false

      const newFile = data.replace(/(@CSS*[A-Za-z][A-Za-z0-9-()#,%. _\r\n*[\]@+=]*@CSS)/g, () => {
        hasReplacement = true
        const data = Files[name as keyof typeof Files]
        const keys = getKeys(data.map, data.prefix)

        const result = keys.reduce((acc, v) => {
          acc += ` * @cssprop [${v[0]}=${v[1]}] - ${v[2]} \n`
          return acc
        }, '')

        return `@CSS\n${result} * @CSS`
      })
      if (hasReplacement) {
        return new Promise((r) => writeFile(file, newFile, 'utf8', r))
      }
    }),
  )
}

getFilesData()
