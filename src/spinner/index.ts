import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';


export interface ISipnnerProps {
    fullscreen: boolean
    fullContent: boolean
    small: boolean
    big: boolean
}

@customElement('lit-spinner')
export class LitSpinner extends LitElement{
    static styles = css`
        :host([fullscreen]){
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
            display: flex;
            height: 100vh;
            width: 100%;
            align-items: center;
            justify-content: center;
            background-color: var(--spinner-background);
        }
        :host([fullContent]){    
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: var(--spinner-background);
            
        }
        :host(.container){
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .pulsor{
            width: 30px;
            height: 30px;
            position: relative;
        }
        :host([small]) .pulsor{
            position: absolute;
            left: calc(50% - 7.5px);
            top: calc(50% - 7.5px);
            width: 15px;
            height: 15px;
        }
        :host([big]) .pulsor{
            width: 50px;
            height: 50px;
        }
        .bounce {
            background-color: var(--spinner-color, rgba(0,0,0,0.5));
            width: 100%;
            height: 100%;
            border-radius: 50%;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-animation: sk-bounce 1.5s infinite ease-in-out;
            animation: sk-bounce 1.5s infinite ease-in-out;
        }
        .bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
        @-webkit-keyframes sk-bounce {
            0%, 100% {
                -webkit-transform: scale(0.0)
            }
            50% {
                -webkit-transform: scale(1.0)
            }
        }
        @keyframes sk-bounce {
            0%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            }
            50% {
                transform: scale(1.0);
                -webkit-transform: scale(1.0);
            }
        }
    `;
    @property({type: Boolean, attribute: true, reflect: true}) big: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) small: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) fullContent: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) fullscreen: boolean = false;

    render(){
        return html`
            <div class = "pulsor">
                <div class="bounce bounce1"></div>
                <div class="bounce bounce2"></div>
            </div>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-spinner': LitSpinner;
    }
}