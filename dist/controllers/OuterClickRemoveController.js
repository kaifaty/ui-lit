export class OuterClickRemoveController {
    constructor(host) {
        this.handleClick = (e) => {
            if (e.target !== this.host) {
                this.host.remove();
            }
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
