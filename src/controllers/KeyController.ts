import {ReactiveController, ReactiveControllerHost} from 'lit';

interface IKeyControllerHost extends ReactiveControllerHost{
    onkeyDown(e: KeyboardEvent): void
}

export class KeyDownController implements ReactiveController{
    host: IKeyControllerHost;
  
    constructor(host: IKeyControllerHost) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("keydown", this.onkeyDown);
        console.log('hostConnected')
    }
    hostDisconnected() {
        console.log('hostDisconnected')
        document.removeEventListener("keydown", this.onkeyDown);
    }
    onkeyDown = (e: KeyboardEvent) => {
        console.log(e)
        this.host.onkeyDown(e);
    }
}