import { ReactiveController, ReactiveControllerHost, LitElement } from 'lit';



export class FocusController implements ReactiveController{
    host: LitElement;
    focused: boolean = false;
    constructor(host: LitElement) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        this.host.addEventListener("focus", this._onFocus);
        this.host.addEventListener("blur", this._onBlur);
    }
    hostDisconnected() {
        this.host.removeEventListener("focus", this._onFocus);
        this.host.removeEventListener("blur", this._onBlur);
    }
    private _onFocus = () => {
        this.focused = true;
        // this.host.requestUpdate();
    }
    private _onBlur = () => {
        this.focused = false;
        // this.host.requestUpdate();
    }
}