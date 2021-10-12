import {ReactiveController, LitElement} from 'lit';


export class OuterClickRemoveController implements ReactiveController{
    host: LitElement;
  
    constructor(host: LitElement) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.handleClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.handleClick);
    }
    handleClick = (e: Event) => {
        if(e.target !== this.host){
            this.host.remove();
        }
    }
}