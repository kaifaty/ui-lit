import type { LitElement } from 'lit';
import { Focusable } from './inderface';
import { property } from 'lit/decorators.js';

type Constructor<T> = new (...args: any[]) => T;

export const focusable = <T extends Constructor<LitElement>>(superClass: T) => {
    class FocusableElement extends superClass implements Focusable{
        
        @property({type: Boolean, reflect: true}) autofocus: boolean = false;
        
        constructor(...args: any[]) {
            super(...args);
        }
        public get isFocused(){
            return !!this.shadowRoot?.querySelector('input:focus');
        }
        
        focus(){
            const el = this.shadowRoot?.querySelector('input, button, textarea');            
            if(el){
                (el as HTMLElement).focus();
                if(el instanceof HTMLInputElement){
                    el.setSelectionRange(el.value.length, el.value.length);
                }                
            }
        }
        
        firstUpdated(props: Map<string | number | symbol, unknown>){
            super.firstUpdated(props);
            if(this.autofocus){
                this.focus()
            }
        }
    }
    
    return FocusableElement as Constructor<Focusable> & T;
}