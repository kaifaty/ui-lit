import {ReactiveController, LitElement} from 'lit';


export class OuterClickRemoveController implements ReactiveController{
    host: LitElement;
  
    constructor(host: LitElement) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.onClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.onClick);
    }
    onClick = (e: Event) => {
        if(e.target !== this.host){
            this.host.remove();
        }
    }
}