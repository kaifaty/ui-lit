
import { LitElement, html, nothing} from 'lit';
import type {TemplateResult} from 'lit';
import { state, customElement, property } from 'lit/decorators';
import { getScrollbarWidth } from 'kailib'
import { DIALOG_STYLES } from './styles';
import { scrollbar } from '../styles/scrollbar';
import { KeyDownController } from '../controllers/KeyController';

export interface IDialogProps {
    opened: boolean
    closeBtnText: string
    useCancelBtn: boolean
    back(): void
    open(): void
    close(): void
}
let pool: LitDialog[] = [];
@customElement('lit-dialog')
export class LitDialog extends LitElement{
    static get styles() {
        return [DIALOG_STYLES, scrollbar];
    };
    @property({type: String, attribute: false}) closeBtnText: TemplateResult | string = "Close";
    @property({type: Boolean, attribute: true, reflect: true}) opened: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) useCancelBtn: boolean = true;
    @property({type: Object, attribute: false}) content: string | TemplateResult= "";

    @state() headerVisible = false;
    private _keyPressController = new KeyDownController(this);

    resolve: Function | null = null;

    private _footerTemplate(){
        return html`${
            this.useCancelBtn 
            ? html`<div @click = "${this.close}" class = "closebtn-wrapper">
                        <slot name = "closeBtn">
                            <lit-button 
                                    type = "button"
                                    class = "button">${this.closeBtnText}</lit-button>
                        </slot>
                    </div>`
            : nothing
        }
        <slot name = "footer"></slot>`;
    }
    render(){
        return html`
        <div class = "overlap">
            <div class = "dialog" @click = "${this._onClick}">
                <header class = "${this.headerVisible ? 'visible': ''}">
                    <slot name = "header" 
                        @slotchange = "${this._headerChanged}"></slot>
                </header>
                ${pool.length > 1 
                    ? html`<lit-icon 
                        class = "arrow-back" 
                        icon = "dropdown"
                        @click = "${this.back}"
                        ></lit-icon>` 
                    : nothing}
                <lit-icon 
                        icon = "cancel" 
                        class = "close-icon" 
                        @click = "${this.close}"></lit-icon>
                <main class = "ff-scrollbar"><slot></slot></main>
                <footer>${this._footerTemplate()}</footer>
            </div>
        </div>`
    }

    // **** Actions **** 
    private _headerChanged = (e: Event) => {
        this.headerVisible = true;
    }
    private _show(){
        document.body.style.paddingRight = getScrollbarWidth() + "px";
        document.body.style.overflow = 'hidden';            
        this.opened = true;
    }
    private _hide(){
        document.body.style.paddingRight = "initial";
        document.body.style.overflow = 'initial';
    }
    public open(){
        const opened = pool.filter(d => d === this)[0];
        if(opened) return;
        pool.forEach(it => it.removeAttribute('opened'));
        pool.push(this);
        this.opened = true;
        this._show();
        
        this.dispatchEvent(new CustomEvent('dialogOpened'));
        return new Promise(r => {
            this.resolve = r;
        });
    }
    public back(){
        this.opened = false;
        this._hide();
        this.resolve?.(false);
        this.resolve = null;
        pool = pool.filter(it => it !== this);
        pool[pool.length - 1]?.setAttribute('opened', '');
        this.dispatchEvent(new CustomEvent('dialogBack'));
    }
    public close(){
        this.opened = false;
        this._hide();
        pool.forEach(it => {
            it.resolve?.(false);
            it.resolve = null;
        });
        pool = [];
        this.dispatchEvent(new CustomEvent('dialogClose'));
    }
    public confirm(){
        const data = this.querySelector('lit-form');
        if(data){
            const result = data.submit();
            if(result){
                this.resolve?.(result);
            }
            else{
                return;
            }
        }
        else{
            this.resolve?.(true);
        }
        this.resolve = null;
        this.dispatchEvent(new CustomEvent('dialogConfirm'));
        this.close();
        
    }
    

    // **** Events **** 
    
    private _onClick(e: Event){
        const el = e.target as HTMLElement;
        if(el.closest('[confirm]')){
            this.confirm();
        }
        else if(el.closest('[close]')){            
            this.close();
        }
    }
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "Escape"){
            this.close()
        }        
    }

}
declare global {
    interface HTMLElementTagNameMap {
      'lit-dialog': LitDialog;
    }
}