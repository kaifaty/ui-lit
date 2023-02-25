import {ReactiveController, ReactiveControllerHost} from '../mixins/withControllers/index'

export class FocusController implements ReactiveController {
  host: ReactiveControllerHost
  focused = false
  constructor(host: ReactiveControllerHost) {
    ;(this.host = host).addController(this)
  }
  hostConnected() {
    this.host.addEventListener('focus', this._onFocus)
    this.host.addEventListener('blur', this._onBlur)
  }
  hostDisconnected() {
    this.host.removeEventListener('focus', this._onFocus)
    this.host.removeEventListener('blur', this._onBlur)
  }
  private _onFocus = () => {
    this.focused = true
  }
  private _onBlur = () => {
    this.focused = false
  }
}
