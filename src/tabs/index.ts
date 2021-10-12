import { classMap } from 'lit/directives/class-map';
import { LitElement, css, html, TemplateResult } from 'lit';
import { formAssociated } from '../form-associated/index';
import { property, customElement } from 'lit/decorators';
import { FormAssociatedProps } from '../form-associated/interface';
import { KeyDownController } from '../controllers/KeyController';

type TTabType = 'button' | 'tab';
export type TTab = {
    value: string;
    text: string | TemplateResult;
    icon?: string | TemplateResult;
}

export interface ITabs extends FormAssociatedProps{
    items: TTab[],
    type: TTabType;

}

@customElement("tabs-element")
export class TabsElement extends formAssociated(LitElement) implements ITabs{
    static styles = css`
    :host{
        display: inline-block;
    }
    .content{
        display: flex;
    }
    .type-button .tab{
        border: 1px solid var(--tab-border, #333);
        padding: var(--tab-button-padding, 3px 10px);
    }
    .type-tab .tab{
        padding: var(--tab-padding, 3px 10px);
        border: 1px solid transparent;
        border-bottom: 1px solid var(--tab-border, #333);
        
    }
    .type-tab .tab.selected{
        border-top: 1px solid var(--tab-border, #333);
        border-left: 1px solid var(--tab-border, #333);
        border-right: 1px solid var(--tab-border, #333);
        border-bottom: 1px solid transparent;
    }
    .tab{
        background-color: var(--tab-background);
        color: var(--tab-color);
        cursor: pointer;
    }
    .tab.selected, 
    :not(.disabled) .tab:not(:focus):hover, 
    :not(.disabled) :focus{
        background-color: #eee;
    }
    .disabled{
        opacity: 0.5;
    }`;
    
    @property({type: Array}) items: TTab[] = [];
    @property({type: String}) type: TTabType = 'button';
    private _keyPressController = new KeyDownController(this);

    render(){
        const map = {
            content: true,
            type: this.type,
            disabled: this.disabled,
            ["type-"+ this.type]: true,
        };
        return html`
        <div class = "${classMap(map)}">
            ${this.items.map(it => {
                const map = {
                    tab: true,
                    selected: it.value === this.value,
                    ["value-" + it.value]: true
                };
                return html`<div 
                @focus = "${this._handleFocus}"
                data-value = "${it.value}"
                class = "${classMap(map)}" 
                tabindex = "0">${it.text}</div>`;
            })}
        </div>`;
    }
    currentOption(){
        return this.items.findIndex(it => it.value === this.value);        
    }
    setValue(value: string){
        if(this.disabled) return;
        this.value = value;
        (this.shadowRoot?.querySelector(".value-" + value) as HTMLElement)?.focus();
    }
    nextSelect(){
        let current = this.currentOption();
        current++;
        if(current > this.items.length - 1){
            current = 0;
        }
        this.setValue(this.items[current].value)
    }
    prevSelect(){
        let current = this.currentOption();
        current--;
        if(current < 0){
            current = this.items.length - 1;
        }
        this.setValue(this.items[current].value)
    }    
    handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "ArrowRight"){
            this.nextSelect();
        }
        if(e.key === "ArrowLeft"){
            this.prevSelect();
        }
    }
    private _handleFocus(e: Event){
        this.setValue((e.target as HTMLElement).dataset.value!)
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'tabs-element': TabsElement;
    }
}
