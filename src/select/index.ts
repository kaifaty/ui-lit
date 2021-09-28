import { html, LitElement } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement } from 'lit/decorators';


@customElement("select-element")
export class SelectElement extends formAssociated(LitElement){
    render(){
        return html``;
    }
}