import {ReactiveController, ReactiveControllerHost} from '../mixins/withControllers/index'

export class HoverController implements ReactiveController {
  host: ReactiveControllerHost
  element: HTMLElement
  elementGetter?: () => HTMLElement

  constructor(host: ReactiveControllerHost, elementGetter?: () => HTMLElement) {
    ;(this.host = host).addController(this)
    this.elementGetter = elementGetter
  }
  hostConnected() {
    this.element = this.elementGetter ? this.elementGetter() : this.host
    this.host.addEventListener('mouseover', this.hover)
    this.host.addEventListener('touchstart', this.hover)

    this.host.addEventListener('touchend', this.unhover)
    this.host.addEventListener('mouseout', this.unhover)
  }
  hostDisconnected() {
    this.host.removeEventListener('mouseover', this.hover)
    this.host.removeEventListener('touchstart', this.hover)

    this.host.removeEventListener('touchend', this.unhover)
    this.host.removeEventListener('mouseout', this.unhover)
  }
  hover = () => {
    this.element.setAttribute('hover', '')
  }
  unhover = () => {
    this.element.removeAttribute('hover')
  }
}
