import { customElement, state } from 'lit/decorators';
import { html, LitElement } from 'lit';

@customElement("test-dialog")
class TestDialog extends LitElement{
    @state() opened = false;
    confirm(){
        this.opened = true;
        this.shadowRoot!.querySelector("dialog-element")!.open().then(r => {
            
        });
    }

    render(){
        return html`
        <lit-button @click = "${this.confirm}">Confirm OTP</lit-button>
        <dialog-element>
            <lit-form>
                <slot></slot>
                <lit-textfield 
                    placeholder = "otp" 
                    minlength = "6" 
                    maxlength = "6" 
                    required 
                    name = "otp"></lit-textfield>
                <lit-button confirm>Confirm</lit-button>
            </lit-form>
        </dialog-element>
        `;
    }

}