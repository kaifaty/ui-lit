import {ReactiveController, ReactiveControllerHost} from 'lit'

export class OuterClickRemoveController implements ReactiveController{
    host: ReactiveControllerHost
    action: (e: Event) => void
  
    constructor(host: ReactiveControllerHost, action: (e: Event) => void) {
      (this.host = host).addController(this)
      this.action = action
    }
    hostConnected() {
        document.addEventListener('click', this.action)
    }
    hostDisconnected() {
        document.removeEventListener('click', this.action)
    }
}
