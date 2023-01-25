import {ReactiveController, ReactiveControllerHost} from '../mixins/withControllers/index.js'

export class KeyDownController implements ReactiveController {
  host: ReactiveControllerHost
  action: (e: KeyboardEvent) => void

  constructor(host: ReactiveControllerHost, action: (e: KeyboardEvent) => void) {
    ;(this.host = host).addController(this)
    this.action = action
  }
  hostConnected() {
    document.addEventListener('keydown', this.action)
  }
  hostDisconnected() {
    document.removeEventListener('keydown', this.action)
  }
}
