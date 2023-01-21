import {isiOS, IsSafari} from '@kai/utils'
import {html, LitElement, nothing, TemplateResult} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {live} from 'lit/directives/live.js'
import {createRef, ref, Ref} from 'lit/directives/ref.js'


import {Focusable} from '../../mixins/focusable/types'
import {focusable} from '../../mixins/focusable/index'
import {formAssociated} from '../../mixins/form-associated/index'
import type {FormAssociated} from '../../mixins/form-associated/types'
import '../icon'
import {labled} from '../../mixins/labled'
import {notificatable} from '../../mixins/notificatable/index'
import {input} from '../../styles/input'


const _isIOS = isiOS()


export interface NumberProps extends FormAssociated, Focusable{
    replaceToRange: boolean,
    useCancelButton: boolean,
    placeholder: string,
    value: string,
    decimals: number,
    valueAsNumber: number,
    min: number,
    max: number,
    icon: string | TemplateResult,
}

const filterZeroues = (decimals: string) => {
    let res = ''
    let nonZeroExist = false
    if(!decimals) return res
    for(let i = decimals.length - 1; i >= 0; i--){
        if(decimals[i] !== '0'){
            nonZeroExist = true
        }
        if(nonZeroExist){
            res = decimals[i] + res
        }
    }
    return res
}
const filterNotNumbers = (str: string) => {
    let res = ''
    for(let i = 0; i < str.length; i ++){
        const code = str.charCodeAt(i)
        if(code === 45 || code === 46 || code >= 48 && code <= 57){
            res += str[i]
        }
    }
    return res
}

@customElement('lit-numberfield')
export class LitNumberField extends focusable(labled(notificatable(formAssociated(LitElement)))) implements NumberProps{
    static get styles (){
        return [
            ...super.elementStyles, 
            input
        ]
    };

    static get properties(){        
        return {
            ...super.properties,
            value: {type: String, hasChanged: () => true},
            valueAsNumber: {type: Number},
        }
    }

    @property({type: Number}) min = NaN
    @property({type: Number}) max = NaN
    @property({type: Number}) decimals = 8
    @property({type: Boolean}) replaceToRange = false
    
    @property({type: String}) placeholder = ''
    @property({type: String}) inputmode: 'decimal' | 'numeric' = 'decimal'

    @property({type: Boolean}) useCancelButton = false
    @property() icon: string | TemplateResult = ''

    private _selectionBeforeRender = 0
    private _inputRef: Ref<HTMLInputElement> = createRef()

    get valueAsNumber(){
        return Number(this._value)
    }
    set valueAsNumber(value: number){
        if(!value){
            this.value = ''
            return
        }
        if(typeof value === 'number'){      
            const [ceil, dec] = value.toFixed(this.decimals).split('.')
            const filtered = filterZeroues(dec)
            if(filtered){
                this.value = ceil + '.' + filtered
            }
            else{
                this.value = ceil
            }
        }
        else if(typeof value === 'string'){
            this.value = value
        }
        
    }

    private _value = ''
    get value(){
        return this._value
    }
    set value(value: string){
        const oldValue = this._value
        if(Number(value) === Number(oldValue)){
            return
        }
        this._value = this._valueResolve(value)
        this.requestUpdate('value', oldValue)
    }

    private _valueResolve(rawValue: string){
        if(!rawValue) return ''
        let value = filterNotNumbers(rawValue.replace(',', '.'))
        const [ceil, ...decs] = value.split('.')
        const decimals = decs.join('')
        if(decimals.length){
            value = ceil + '.' + decimals.slice(0, this.decimals)
        }
        if(this.replaceToRange){
            const asNumber = Number(value)
            if(!isNaN(this.min) && asNumber < this.min){
                value = this.min.toString()
            }
            else if(!isNaN(this.max) && asNumber > this.max){
                value = this.max.toString()
            }
        }
        return value
    }
    private _cancelIconTemplate(){
        if(!this.useCancelButton ||  !this.value) return nothing
        return html`<lit-icon 
                        @click = "${this._clearValue}"
                        icon = "remove" 
                        danger
                        class = "danger icon"></lit-icon>`
    }
    private _onClick(e: Event){
        e.stopPropagation()
    }
    get selectionStart(){
        return this._inputRef.value?.selectionStart  || 0
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.willUpdate(_changedProperties)
        this._selectionBeforeRender = this.selectionStart
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "text" 
                   ?disabled = "${this.disabled}"
                   ?readonly = "${this.readonly}"
                   placeholder = "${this.placeholder}"
                   spellcheck = "${this.spellcheck}"
                   inputmode = "decimal"
                   @input = "${this._handleInput}" 
                   @change = "${this._handleChange}"
                   @click = "${this._onClick}"
                   ${ref(this._inputRef)}
                   .value = ${live(this.value)}>
            ${this._cancelIconTemplate()}
            <div class = "icon"><slot name = "icon"></slot></div>
        </div>`
    }
    updated(props: Map<string | number | symbol, unknown>){
        super.updated(props)
        if(this._selectionBeforeRender !== this.selectionStart && !_isIOS && !IsSafari){
            this._inputRef.value?.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender)
        }
        this.validate()        
    }
    
    public validate(){
        super.validate()
        //if(!this.required && this.disabled) return;
        const skip = !this.required && this.disabled
        if(this.min){
            if(this.valueAsNumber < this.min && !skip){
                this.setValidity({rangeUnderflow: true})
            }
            else if(this.validity.rangeUnderflow){
                this.setValidity({rangeUnderflow: false})
            }
        }
        if(this.max){
            if(this.valueAsNumber > this.max && !skip){
                this.setValidity({rangeOverflow: true})
            }
            else if(this.validity.rangeOverflow ){
                this.setValidity({rangeOverflow: false})
            }
        }
    }

    private _clearValue(){
        this.value = ''
    }
    
    // ==== Events ====
    private _handleChange(e: Event){
        this.reportValidity()
    }

    private _handleInput(e: Event){
        const oldValue = this._value
        const value = (e.target as HTMLInputElement).value as string 
        this.value = value
        if(oldValue !== this._value){
            this.notify()
        }
        
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-numberfield': LitNumberField;
    }
}
