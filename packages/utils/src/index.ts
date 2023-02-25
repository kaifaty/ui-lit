export * from './controllers/index'
export * from './helpers/index'
export * from './mixins/index'
export * from './form-assosiated/index'
export * from './styles/index'
export * from './create-css-map'
export {pallets} from './colors/default-color'

declare global {
  interface HTMLElement {
    connectedCallback(): void
    disconnectedCallback(): void
  }
}
