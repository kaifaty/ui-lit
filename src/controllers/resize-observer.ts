import {noChange, ReactiveController, ReactiveControllerHost} from 'lit'
import {Directive, directive, ElementPart, PartInfo, PartType} from 'lit/directive.js'

interface IResizeObserverController extends ReactiveController {
    startOberve (el: HTMLElement): void
}

class ResizeDirective extends Directive{
    _inited = false
    constructor(partInfo: PartInfo){
        super(partInfo)
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('Must be element')
        }
    }
    render(controller: ReactiveController){
        return noChange
    }
    update(part: ElementPart, args: [IResizeObserverController]){
        if(this._inited === false){
            args[0].startOberve(part.element as HTMLElement)     
            this._inited = true
        }
    }
}
const resizeDirective = directive(ResizeDirective)

type OnChangeAction = (...args: any[]) => void

export class ResizeObserverController implements IResizeObserverController{
    host: ReactiveControllerHost
    _observer: ResizeObserver | null = null
    _lastFunction?: OnChangeAction
    _observers = new Map()

    constructor(host: ReactiveControllerHost) {
      (this.host = host).addController(this)
    }
    hostConnected(){
        this._observer = new ResizeObserver(this.onMutate)
    }
    hostDisconnected() {
        this._observer?.disconnect()
        this._observers.clear()
    }
    
    private onMutate = (entries: ResizeObserverEntry[]) => {
        for(const entry of entries){
            const func = this._observers.get(entry.target)
            if(func){
                func(entry.contentRect)
            }                        
        }
    }
    startOberve(el: HTMLElement){
        this._observers.set(el, this._lastFunction)
        this._observer?.observe(el, {'box': 'content-box'})
    }
    observe(f?: OnChangeAction){
        this._lastFunction = f
        return resizeDirective(this)
    }
}