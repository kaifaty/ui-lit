import { ReactiveController, LitElement, ReactiveControllerHost } from 'lit';

interface IClickControllerHost extends ReactiveControllerHost{
    handleClick(e: Event): void
}

export class OuterClickRemoveController implements ReactiveController{
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
        this.host.handleClick(e)
    }
}