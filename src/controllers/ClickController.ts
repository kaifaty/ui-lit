import {ReactiveController, ReactiveControllerHost} from 'lit';

interface IClickControllerHost extends ReactiveControllerHost{
    onDocumentClick(e: Event): void
}

export class ClickController implements ReactiveController{
    host: IClickControllerHost;
  
    constructor(host: IClickControllerHost) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.onClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.onClick);
    }
    onClick = (e: Event) => {
        this.host.onDocumentClick(e);
    }
}