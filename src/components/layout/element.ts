import {css, html, LitElement} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

import '../icon'
import type {LitLayoutGrid} from './grid'
import {element} from './styles'

@customElement('lit-layout')
export class LitLayout extends LitElement{
  static styles = element
  @property({type: Number}) minWidth = 240
  @property({type: Number}) maxWidth = 520
  @property({type: Number}) minHeight = 240
  @property({type: Number}) maxHeight = 520
  @property({type: Number}) height = 400
  @property({type: Number}) width = 320
  @property({type: Number}) top = 0
  @property({type: Number}) left = 0
  @property({type: Number}) zIndex = 1
  @property({type: String}) name = ''


  connectedCallback(){
    super.connectedCallback()
    this.width = (this.parentElement as LitLayoutGrid).getNewPosition(this.width)
    this.height = (this.parentElement as LitLayoutGrid).getNewPosition(this.height)
    this.addEventListener('click', this._onClick)
  }
  disconnectedCallback(): void {
    this.removeEventListener('click', this._onClick)
    super.disconnectedCallback()
  }
  _onClick = () => {
    this.dispatchEvent(new CustomEvent('raise', {
      bubbles: true,
      detail: this
    }))
  }
  willUpdate(){
    this._setStyleValue('--width', this.width)
    this._setStyleValue('--height', this.height)
    this._setStyleValue('--left', this.left)
    this._setStyleValue('--top', this.top)
    this._setStyleValue('--z-index', this.zIndex)
  }

  render(){
    return html`
    <div class = "wrapper">
      <slot></slot>
    </div>
    <lit-icon 
        @pointerdown = "${this._onStartMove}" 
        class = "move" 
        icon = "move"></lit-icon>
    <lit-icon 
        @pointerdown = "${this._onResize}"
        class = "resize" 
        icon = "resize"></lit-icon>
    `
  }

  /** Events */
  private _onResize(e: MouseEvent){
    this.dispatchEvent(new CustomEvent('startResize', {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top,
      },
      bubbles: true
    }))
  }
  private _onStartMove(e: MouseEvent){
    this.dispatchEvent(new CustomEvent('startmove', {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top,
      },
      bubbles: true
    }))
  }

  /** Actions */
  public getPosition(){
      const data =  {
          width: this.width,
          height: this.height,
          minWidth: this.minWidth,
          minHeight: this.minHeight,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          zIndex: this.zIndex,
          top: this.top,
          left: this.left
      }
      return data
  }
  setPosition(x: number, y: number){
    if(x !== this.left || y !== this.top){
      this.top = y
      this.left = x
    }
  }
  setSize(width: number, height: number){
    if(width < this.minWidth || height < this.minHeight) return
    this.width = width
    this.height = height
  }
  
  private  _setStyleValue(valueName: string, value: number){
    const currentValue = this.style.getPropertyValue(valueName)
    if(currentValue != value + 'px'){
      this.style.setProperty(valueName, value + (valueName.includes('index') ? '' : 'px'))
    }
  }  
} 



declare global {
    interface HTMLElementTagNameMap {
      'lit-layout': LitLayout;
    }
    
}