import {isLCHSupports} from './is-lch-supports'
import better from 'better-color-tools'

let supports = isLCHSupports()

type Levels = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
type Names = `${Levels}`
type Data = {
  H: number
  C: {
    step: number
    start: number
  }
  L: {
    step: number
    start: number
  }
  a?: number
}

const genaratePallete = <T extends string>({C, L, H, a = 1}: Data): Record<Names, string> => {
  const res: any = {}

  for (let i = 0; i < 10; i++) {
    const level = (100 * (i + 1)).toString()
    const cC = (C.start + i * C.step) / 100
    const cL = L.start + i * L.step
    const levelname = `${level}` as any
    const raw = `oklch(${cL}%, ${cC}, ${H} / ${a * 100}%)`
    const value = better.from(raw)

    if (!supports) {
      res[levelname] = value.rgb
    } else {
      res[levelname] = value.oklch
    }
  }
  console.log(res)
  return res
}
const base = 255

const defaultProps = {C: {start: 15, step: 1}, L: {start: 93, step: -5}}
const primaryProps = {H: base, ...defaultProps}
const dangerProps = {H: 21, ...defaultProps}
const warningProps = {H: 66, ...defaultProps}
const successProps = {H: 131, ...defaultProps}

export const pallets = {
  neutral: genaratePallete({H: base, C: {start: 0, step: 0.1}, L: {start: 100, step: -9}}),
  primary: genaratePallete(primaryProps),
  primary20: genaratePallete({...primaryProps, a: 0.2}),
  primary40: genaratePallete({...primaryProps, a: 0.4}),
  danger: genaratePallete(dangerProps),
  warning: genaratePallete(warningProps),
  success: genaratePallete(successProps),
} as const
