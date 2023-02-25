import {ReactiveController, ReactiveControllerHost} from '../mixins/withControllers/index'

type OnChangeAction = (rect: DOMRect) => void

export class ResizeObserverController implements ReactiveController {
  private _host: ReactiveControllerHost
  private _observer: ResizeObserver | null = null
  private _observerCallback?: OnChangeAction
  private _element: HTMLElement

  constructor(host: ReactiveControllerHost) {
    ;(this._host = host).addController(this)
    this._observer = new ResizeObserver(this._onMutate)
  }
  hostConnected() {}
  hostDisconnected() {
    this._observer.unobserve(this._element)
  }

  private _onMutate = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      this._observerCallback(entry.contentRect)
      return
    }
  }
  startOberve(el: HTMLElement) {
    this._element = el
    this._observer.observe(el, {box: 'content-box'})
  }
  observe(observer: OnChangeAction) {
    this._observerCallback = observer
  }
}
