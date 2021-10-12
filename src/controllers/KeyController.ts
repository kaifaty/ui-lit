import {ReactiveController, ReactiveControllerHost} from 'lit';

interface IKeyControllerHost extends ReactiveControllerHost{
    handlekeyDown(e: KeyboardEvent): void
}

export class KeyDownController implements ReactiveController{
    host: IKeyControllerHost;
  
    constructor(host: IKeyControllerHost) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("keydown", this.handlekeyDown);
    }
    hostDisconnected() {
        document.removeEventListener("keydown", this.handlekeyDown);
    }
    handlekeyDown = (e: KeyboardEvent) => {
        this.host.handlekeyDown(e);
    }
}