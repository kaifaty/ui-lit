import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../icon';
import type { LitLayoutGrid } from './grid';

@customElement("lit-layout")
export class LitLayout extends LitElement{
  static styles = css`
    :host{
      display: block;
      box-sizing: border-box;
      width: var(--width, 200px);
      height: var(--height, 200px);
      padding: var(--lit-layout-padding, 3px);
      position: absolute;
      left: var(--left, 0);
      top: var(--top, 0);
      z-index: var(--z-index, 1);
    }
    .wrapper{
      background-color: var(--lit-layout-background, #ccc);
      padding: 3px 6px;
      box-sizing: border-box;
      height: 100%;

    }

    .resize, .move{
      opacity: 0.5;
      font-size: 10px;
    }
    .move{
      position: absolute;
      right: -4px;
      top: -2px;
      z-index: 10;
      padding: 5px;
      
    }
    .resize{
      position: absolute;
      right: -3px;
      bottom: -2px;
      transform-origin: center;
      transform: scaleX(-1);
      cursor: nw-resize;
      padding: 5px;
      z-index: 10;
      --icon-font-size: 7px;
    }
    .move{
      cursor: move;
      padding: 0 4px 0 0;
    }
    :host(.move),
    :host(.resize){
      pointer-events: none;
    }
  `;
  @property({type: Number}) minWidth: number = 240;
  @property({type: Number}) maxWidth: number = 520;
  @property({type: Number}) minHeight: number = 240;
  @property({type: Number}) maxHeight: number = 520;
  @property({type: Number}) height: number = 400;
  @property({type: Number}) width: number = 320;
  @property({type: Number}) top: number = 0;
  @property({type: Number}) left: number = 0;
  @property({type: Number}) zIndex: number = 1;
  @property({type: String}) name: string = '';


  connectedCallback(){
    super.connectedCallback();
    this.width = (this.parentElement as LitLayoutGrid).getNewPosition(this.width);
    this.height = (this.parentElement as LitLayoutGrid).getNewPosition(this.height);
    this.addEventListener('click', this._onClick);
  }
  disconnectedCallback(): void {
    this.removeEventListener('click', this._onClick);
    super.disconnectedCallback()
  }
  _onClick = () => {
    this.dispatchEvent(new CustomEvent("raise", {
      bubbles: true,
      detail: this
    }))
  }
  willUpdate(){
    this._setStyleValue('--width', this.width);
    this._setStyleValue('--height', this.height);
    this._setStyleValue('--left', this.left);
    this._setStyleValue('--top', this.top);
    this._setStyleValue('--z-index', this.zIndex);
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
    `;
  }

  /** Events */
  private _onResize(e: MouseEvent){
    this.dispatchEvent(new CustomEvent("startResize", {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top,
      },
      bubbles: true
    }));
  }
  private _onStartMove(e: MouseEvent){
    this.dispatchEvent(new CustomEvent("startmove", {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top,
      },
      bubbles: true
    }));
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
      return data;
  }
  setPosition(x: number, y: number){
    if(x !== this.left || y !== this.top){
      this.top = y;
      this.left = x;
    }
  }
  setSize(width: number, height: number){
    if(width < this.minWidth || height < this.minHeight) return;
    this.width = width;
    this.height = height;
  }
  
  private  _setStyleValue(valueName: string, value: number){
    const currentValue = this.style.getPropertyValue(valueName);
    if(currentValue != value + "px"){
      this.style.setProperty(valueName, value + (valueName.includes('index') ? '' : "px"));
    }
  }  
} 



declare global {
    interface HTMLElementTagNameMap {
      'lit-layout': LitLayout;
    }
    
}