import {ReactiveController, ReactiveControllerHost} from 'lit';

interface IClickControllerHost extends ReactiveControllerHost{
    handleDocumentClick(e: Event): void
}

export class ClickController implements ReactiveController{
    host: IClickControllerHost;
  
    constructor(host: IClickControllerHost) {
      (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.handleClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.handleClick);
    }
    handleClick = (e: Event) => {
        this.host.handleDocumentClick(e);
    }
}