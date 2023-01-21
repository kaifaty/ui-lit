import {css, html, LitElement} from 'lit'
import {customElement, property, query, queryAll, state} from 'lit/decorators.js'

import {scrollbar} from '../../styles/scrollbar'

import type {LitLayout} from './element'
import {grid} from './styles'

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

@customElement('lit-layout-grid')
export class LitLayoutGrid extends LitElement{
    static styles = [grid, scrollbar]
    
    @query('.shadow') shadow!: HTMLElement
    @query('.wrapper ') wrapper!: HTMLElement
    @property({type: Number}) cellSize = 20
    @state() isMoving = false
    @state() isResizing = false
    @state() layoutElementData: null | {
        element: LitLayout,
        layerX: number,
        layerY: number
    } = null
    @state() shadowX = 0
    @state() shadowY = 0
    @state() shadowWidth = 0
    @state() shadowHeight = 0
    
    _maxIndex = 2

    
    shadowTemplate(){
        const width = this.shadowWidth || this.layoutElementData?.element.width || 0
        const height = this.shadowHeight || this.layoutElementData?.element.height || 0
        const top = this.shadowY || this.layoutElementData?.element.top || 0
        const left = this.shadowX || this.layoutElementData?.element.left || 0
        return html`        
        <div class = "shadow ${this.isMoving || this.isResizing? 'show' : ''}" 
             style = "z-index: ${this._maxIndex - 1}; width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px"></div>`
    }
    render(){
        return html`
        <div class = "wrapper ff-scrollbar ${this.isMoving ? 'move' : ''} " 
            @raise = "${this._onRaize}"
            @startmove = "${this._onStartMove}"
            @startResize = "${this._onStartResize}"
            @mousemove = "${this._onMove}">            
            <slot></slot>
            ${this.shadowTemplate()}
        </div>`
    }
    private _raize(node: LitLayout){
        this._maxIndex = this._getMaxZIndex() + 1
        node.zIndex = this._maxIndex
    }
    private _onRaize(e: CustomEvent){
        this._raize(e.detail)
    }

    private _onStart(e: CustomEvent){
        this.layoutElementData = e.detail

        this._normalize()
        this._raize(this.layoutElementData!.element)
        this.shadowX = this.layoutElementData!.element.left
        this.shadowY = this.layoutElementData!.element.top
        document.addEventListener('mouseup', this._onEndMove)
        
    }
    private _onStartMove(e: CustomEvent){
        this._onStart(e)
        this.isMoving = true
        this.querySelectorAll('lit-layout').forEach(el => el.classList.add('move'))
    }
    private _onStartResize(e: CustomEvent){
        this._onStart(e)
        this.isResizing = true
        this.querySelectorAll('lit-layout').forEach(el => el.classList.add('resize'))
    }
    private _onEndMove = (e: Event) => {
        if(this.isMoving){
            this.isMoving = false
            this.layoutElementData?.element.setPosition(this.shadowX, this.shadowY)
        }
        else if(this.isResizing){
            this.isResizing = false
            this.layoutElementData?.element.setSize(this.shadowWidth, this.shadowHeight)
        }
        this.layoutElementData = null
        this.shadowX = 0
        this.shadowY = 0
        this.shadowWidth = 0
        this.shadowHeight = 0
        this.querySelectorAll('lit-layout').forEach(el => (el.classList.remove('move'), el.classList.remove('resize')))
        
        document.removeEventListener('mouseup', this._onEndMove)
    }
    private _onMove(e: MouseEvent){
        if(!this.layoutElementData) return
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        requestAnimationFrame(() => {
            if(this.isResizing){
                this.setSize(e.pageX, e.pageY)
            }
            else if(this.isMoving){
                this.setPosition(e.pageX, e.pageY)
            }
        })
    }
    getNewPosition(value: number){
        const dv = value % this.cellSize
        const _dv = dv > this.cellSize / 2 ? (this.cellSize - dv) : -dv
        return Math.round(value + _dv)
    }
    showShadow(data: {x?: number, y?: number, width?: number, height?: number}){
        if(data.x && data.y){
            this.shadowX = this.getNewPosition(data.x)
            this.shadowY = this.getNewPosition(data.y)
        }
        if(data.width && data.height){
            this.shadowWidth = this.getNewPosition(data.width)
            this.shadowHeight = this.getNewPosition(data.height)
        }
        
    }
    setSize(x: number, y: number){
        if(!this.layoutElementData) return
        
        const rect = this.getBoundingClientRect()
        x =  x - this.layoutElementData.element.left - rect.x + this.wrapper.scrollLeft
        y =  y - this.layoutElementData.element.top - rect.y + this.wrapper.scrollTop
        const width = Math.min(
            Math.max(this.layoutElementData.element.minWidth, x), 
            this.layoutElementData.element.maxWidth
        )
        const height = Math.min(
            Math.max(this.layoutElementData.element.minHeight, y), 
            this.layoutElementData.element.maxHeight
        )

        this.layoutElementData.element.setSize(width, height)
        this.showShadow({width, height})
    }
    setPosition(x: number, y: number){
        if(!this.layoutElementData) return
        x = (x - this.layoutElementData.layerX)// - rect.x;
        y = (y - this.layoutElementData.layerY)// - rect.y;
        this.layoutElementData.element.setPosition(x, y)
        this.showShadow({x, y})
    }
    
    private _normalize(){
        [...this.querySelectorAll('lit-layout')]
        .map(n => ({name: n.name, zIndex: n.zIndex, node: n}))
        .sort((a, b) => {
            if(a.zIndex > b.zIndex) return 1
            if(a.zIndex < b.zIndex) return -1
            return 0
        })
        .forEach((it, i) => it.node.zIndex = i)        
    }
    private _getMaxZIndex(){
        return Math.max(...Object.values(this.getPositions()).map(it => it.zIndex))
    }
    public getPositions(){
        const data: {[key: string]: TPosition} = {}
        this.querySelectorAll('lit-layout').forEach(el => {
            data[el.name] = el.getPosition()
        })
        return data
    }


}

declare global {
    interface HTMLElementTagNameMap {
      'lit-layout-grid': LitLayoutGrid;
    }
    
}