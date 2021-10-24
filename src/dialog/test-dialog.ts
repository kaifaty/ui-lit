import { customElement, state } from 'lit/decorators';
import { html, LitElement } from 'lit';

@customElement("test-dialog")
class TestDialog extends LitElement{
    @state() opened = false;
    confirm(){
        this.opened = true;
        this.shadowRoot!.querySelector("dialog-element")!.open().then(r => {
            console.log('test result', r)
        });
    }

    render(){
        return html`
        <button-element @click = "${this.confirm}">Confirm OTP</button-element>
        <dialog-element>
            <form-element>
                <slot></slot>
                <text-field 
                    placeholder = "otp" 
                    minlength = "6" 
                    maxlength = "6" 
                    required 
                    name = "otp"></text-field>
                <button-element confirm>Confirm</button-element>
            </form-element>
        </dialog-element>
        `;
    }

}