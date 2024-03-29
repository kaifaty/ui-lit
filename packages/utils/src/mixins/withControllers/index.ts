import type {Constructor} from '@ui-wc/types'

export interface ReactiveController {
  hostConnected(): void
  hostDisconnected(): void
}
export interface ReactiveControllerHost extends HTMLElement {
  addController(v: ReactiveController): void
  removeController(v: ReactiveController): void
}

export const withControllers = <T extends Constructor<HTMLElement> = Constructor<HTMLElement>>(superClass: T) => {
  return class WithProps extends superClass implements ReactiveControllerHost {
    private _controllers: ReactiveController[] = []
    addController(controller: ReactiveController) {
      this._controllers.push(controller)
    }
    removeController(controller: ReactiveController) {
      const index = this._controllers.indexOf(controller)
      if (index >= 0) {
        this._controllers.splice(index)
      }
    }
    connectedCallback() {
      super.connectedCallback?.()
      this._controllers.forEach((c) => c.hostConnected())
    }
    disconnectedCallback() {
      super.disconnectedCallback?.()
      this._controllers.forEach((c) => c.hostDisconnected())
    }
  } as T & Constructor<ReactiveControllerHost>
}
