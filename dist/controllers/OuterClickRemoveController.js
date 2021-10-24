export class OuterClickRemoveController {
    constructor(host) {
        this.handleClick = (e) => {
            this.host.handleClick(e);
        };
        (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.handleClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.handleClick);
    }
}
