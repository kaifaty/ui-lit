import { LitElement, html, css } from 'lit';
import { property, customElement, query, state, queryAll} from 'lit/decorators';
import type { LayoutElement } from './element';
import { scrollbar } from '../styles/scrollbar';

export interface TPosition {
    top: number, 
    left: number, 
    width: number, 
    minWidth: number, 
    maxWidth: number, 
    height: number, 
    minHeight: number, 
    maxHeight: number, 
    zIndex: number
}
export interface ILayoutElementProps extends TPosition{
    name: string
}

@customElement("layout-grid")
export class LayoutGrid extends LitElement{
    static styles = [
        css`
        :host{
            display: block;
            width: 100%;
            height: 100%;
        }
        .wrapper{
            overflow: auto;         
            width: 100%;
            height: 100%;
            position: relative;
            background-color: #333;
            
        }
        .wrapper.move{
            cursor: move;
        }
        .shadow{
            display: none;
            position: absolute;
            background-color: var(--layout-shadow-background, #fff);
            z-index: 0;
            top: 0;
            left: 0;
            opacity: 0.5;
        }
        .move .shadow{
            transition: ease-out 0.1s;
        }
        .shadow.show{
            display: block;
        }
        `,
        scrollbar
    ];
    
    @query(".shadow") shadow!: HTMLElement;
    @query(".wrapper ") wrapper!: HTMLElement;
    @property({type: Number}) cellSize: number = 20;
    @state() isMoving: boolean = false;
    @state() isResizing: boolean = false;
    @state() layoutElementData: null | {
        element: LayoutElement,
        layerX: number,
        layerY: number
    } = null;
    __onEndMove = this._onEndMove.bind(this);
    @state() shadowX: number = 0;
    @state() shadowY: number = 0;
    @state() shadowWidth: number = 0;
    @state() shadowHeight: number = 0;
    @state() maxIndex: number = 3;

    
    connectedCallback(){
        super.connectedCallback();
        document.addEventListener('mouseup', this.__onEndMove);
        setTimeout(() => {
            this.maxIndex = this._getMaxZIndex() + 1;
        }, 200)
    }
    disconnectedCallback(){
        document.removeEventListener('mouseup', this.__onEndMove);
        super.disconnectedCallback();
    }

    shadowTemplate(){
        const width = this.shadowWidth || this.layoutElementData?.element.width || 0;
        const height = this.shadowHeight || this.layoutElementData?.element.height || 0;
        const top = this.shadowY || this.layoutElementData?.element.top || 0;
        const left = this.shadowX || this.layoutElementData?.element.left || 0;
        return html`        
        <div class = "shadow ${this.isMoving || this.isResizing? 'show' : ''}" 
             style = "z-index: ${this.maxIndex - 2}; width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px"></div>`;
    }
    render(){
        return html`
        <div class = "wrapper ff-scrollbar ${this.isMoving ? 'move' : ''} " 
            @startmove = "${this._onStartMove}"
            @startResize = "${this._onStartResize}"
            @mousemove = "${this._onMove}">
            
            <slot></slot>
            ${this.shadowTemplate()}
        </div>`;
    }

    private _onStart(e: CustomEvent){
        this.layoutElementData = e.detail;
        this.layoutElementData!.element.zIndex = this.maxIndex++;
        this.shadowX = this.layoutElementData!.element.left;
        this.shadowY = this.layoutElementData!.element.top;
    }
    private _onStartMove(e: CustomEvent){
        this._onStart(e);
        this.isMoving = true;
        this.querySelectorAll('layout-element').forEach(el => el.classList.add('move'));
    }
    private _onStartResize(e: CustomEvent){
        this._onStart(e);
        this.isResizing = true;
        this.querySelectorAll('layout-element').forEach(el => el.classList.add('resize'));
    }
    private _onEndMove(e: Event){
        if(this.isMoving){
            this.isMoving = false;
            this.layoutElementData?.element.setPosition(this.shadowX, this.shadowY);
        }
        else if(this.isResizing){
            this.isResizing = false;
            this.layoutElementData?.element.setSize(this.shadowWidth, this.shadowHeight);
        }
        this.layoutElementData = null;
        this.shadowX = 0;
        this.shadowY = 0;
        this.shadowWidth = 0;
        this.shadowHeight = 0;
        this.querySelectorAll('layout-element').forEach(el => (el.classList.remove('move'), el.classList.remove('resize')));
    }
    private _onMove(e: MouseEvent){
        if(!this.layoutElementData) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        requestAnimationFrame(() => {
            if(this.isResizing){
                this.setSize(e.pageX, e.pageY);
            }
            else if(this.isMoving){
                this.setPosition(e.pageX, e.pageY);
            }
        })
    }
    getNewPosition(value: number){
        const dv = value % this.cellSize;
        const _dv = dv > this.cellSize / 2 ? (this.cellSize - dv) : -dv;
        return Math.round(value + _dv);
    }
    showShadow(data: {x?: number, y?: number, width?: number, height?: number}){
        if(data.x && data.y){
            this.shadowX = this.getNewPosition(data.x)
            this.shadowY = this.getNewPosition(data.y);
        }
        if(data.width && data.height){
            this.shadowWidth = this.getNewPosition(data.width)
            this.shadowHeight = this.getNewPosition(data.height);
        }
        
    }
    setSize(x: number, y: number){
        if(!this.layoutElementData) return;
        
        const rect = this.getBoundingClientRect();
        x =  x - this.layoutElementData.element.left - rect.x + this.wrapper.scrollLeft;
        y =  y - this.layoutElementData.element.top - rect.y + this.wrapper.scrollTop;
        const width = Math.min(
            Math.max(this.layoutElementData.element.minWidth, x), 
            this.layoutElementData.element.maxWidth
        );
        const height = Math.min(
            Math.max(this.layoutElementData.element.minHeight, y), 
            this.layoutElementData.element.maxHeight
        );

        this.layoutElementData.element.setSize(width, height);
        this.showShadow({width, height});
    }
    setPosition(x: number, y: number){
        if(!this.layoutElementData) return;
        x = (x - this.layoutElementData.layerX)// - rect.x;
        y = (y - this.layoutElementData.layerY)// - rect.y;
        this.layoutElementData.element.setPosition(x, y);
        this.showShadow({x, y});
    }
    private _getMaxZIndex(){
        return Math.max(...Object.values(this._getPositions()).map(it => it.zIndex));
    }
    private _getPositions(){
        const data: {[key: string]: TPosition} = {};
        this.querySelectorAll("layout-element").forEach(el => {
            data[el.name] = {
                width: el.width,
                height: el.height,
                minWidth: el.minWidth,
                minHeight: el.minHeight,
                maxWidth: el.maxWidth,
                maxHeight: el.maxHeight,
                zIndex: el.zIndex,
                top: el.top,
                left: el.left,
            }
        });
        return data;
    }
    public getPositions(){
        return this._normalizeZindex(this._getPositions());
    }
    private _normalizeZindex(data: {[key: string]: TPosition}): {[key: string]: TPosition}{
        let index = 1;
        Object.keys(data).map(it => ({...data[it], key: it})).sort((a, b) => {
            if(a.zIndex > b.zIndex){
                return 1;
            }
            if(a.zIndex < b.zIndex){
                return -1;
            }
            return 0
        }).map(it => {
            if(it.zIndex > index){
                index++;
                data[it.key].zIndex = index;
                // it.zIndex = index;
            }
        })
        return data;
    }


}

declare global {
    interface HTMLElementTagNameMap {
      'layout-grid': LayoutGrid;
    }
    
}