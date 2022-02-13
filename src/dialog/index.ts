
import { LitElement, html, nothing} from 'lit';
import type {TemplateResult} from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { getScrollbarWidth } from 'kailib'
import { DIALOG_STYLES } from './styles';
import { scrollbar } from '../styles/scrollbar';
import { KeyDownController } from '../controllers/KeyController';

import '../icon';
import '../button';
import '../form';
import { LitFrom } from '../form/index';
export interface IDialogProps {
    opened: boolean
    closeBtnText: string
    useCancelBtn: boolean
    back(): void
    open(): void
    close(): void
}
let dialogs: LitDialog[] = [];
const peekDialog = () => dialogs[dialogs.length - 1];

@customElement('lit-dialog')
export class LitDialog extends LitElement{
    static get styles() {
        return [DIALOG_STYLES, scrollbar];
    };
    @property({type: String, attribute: false}) closeBtnText: TemplateResult | string = "Close";
    @property({type: Boolean, attribute: true, reflect: true}) opened: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) useCancelBtn: boolean = true;
    @property({type: Object, attribute: false}) content: string | TemplateResult= "";
    @property({type: Object, attribute: false}) onConfirm?: (data?: any) => Promise<any>;
    

    @state() headerVisible = false;
    private _keyPressController = new KeyDownController(this);


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
    public get form(): LitFrom | null | undefined{
        return this.querySelector('lit-form') || this.shadowRoot?.querySelector('lit-form');
    }
    render(){
        return html`
        <div class = "overlap">
            <lit-form 
                class = "dialog" 
                .onAction = "${this.onConfirm}"
                @submit = "${this._submit}"
                @click = "${this._onClick}">
                <header class = "${this.headerVisible ? 'visible': ''}">
                    <slot name = "header" 
                        @slotchange = "${this._headerChanged}"></slot>
                </header>
                <div class = "icons">
                    ${dialogs.length > 1
                        ? html`<lit-icon 
                                    class = "arrow-back"
                                    icon = "back"                        
                                    @click = "${this.back}"
                                ></lit-icon>` 
                        : nothing
                    }<lit-icon 
                        icon = "cancel" 
                        class = "close-icon" 
                        @click = "${this.close}"></lit-icon>
                </div>
                <main class = "ff-scrollbar"><slot></slot></main>
                <footer>${this._footerTemplate()}</footer>
            </lit-form>
        </div>`
    }
    // **** Actions **** 
    private _headerChanged = (e: Event) => {
        this.headerVisible = true;
    }
    private _show(){
        document.body.style.paddingRight = getScrollbarWidth() + "px";
        document.body.style.overflow = 'hidden';                    
    }
    private _hide(){
        document.body.style.paddingRight = "initial";
        document.body.style.overflow = 'initial';
    }

    private _focus(){
        (this.querySelector("lit-textfield, lit-numberfield") as HTMLElement)?.focus();
    }
    public open(){
        if(!dialogs.includes(this)){
            const prev = peekDialog();
            if(prev) prev.opened = false;
            dialogs.push(this);
        }
        this._show();
        this._openInstance(this);        
        this.dispatchEvent(new CustomEvent('dialogOpened'));
        setTimeout(() => {
            this._focus()
        })
    }
    private _openInstance(dialog?: LitDialog){
        if(!dialog) return;
        dialog.opened = true;
    }
    public back(){
        this._closeInstanse(dialogs.pop());
        this._openInstance(peekDialog());
        this.dispatchEvent(new CustomEvent('dialogBack'));
    }
    private _closeInstanse(dialog?: LitDialog){
        if(!dialog) return;
        dialog.opened = false;
        dialog.form?.reset();
        dialog.dispatchEvent(new CustomEvent('dialogClose'));
    }
    public close(){
        this._hide();
        dialogs.forEach(this._closeInstanse);
        dialogs = [];
    }
    public confirm(){
        this.form?.submit();
    }
    private _onConfirm(){
        this.dispatchEvent(new CustomEvent('dialogConfirm'));
        this.back();
    }

    // **** Events **** 
    private _submit(){
        this._onConfirm();
    }

    private _onClick(e: Event){
        const el = e.target as HTMLElement;        
        if(el.closest('[confirm]')){
            this.confirm();
        }
        else if(el.closest('[close]')){            
            this.close();
        }
    }

    // TODO ловушка для фокуса на модальном окне
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