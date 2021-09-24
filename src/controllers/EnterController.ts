import {ReactiveController, ReactiveControllerHost} from 'lit';

interface IKeyEnterControllerHost extends ReactiveControllerHost{
    onkeyEnter(): void
}

export class EnterController implements ReactiveController{
    host: IKeyEnterControllerHost;
  
    constructor(host: IKeyEnterControllerHost) {
      (this.host = host).addController(this);
    }
    hostConnected() {
      document.addEventListener("keypress", this.onKeypress);
    }
    hostDisconnected() {
        document.removeEventListener("keypress", this.onKeypress);
    }
    onKeypress = (e: KeyboardEvent) => {
        if(e.key === "Enter"){
            this.host.onkeyEnter();
        }
    }
}