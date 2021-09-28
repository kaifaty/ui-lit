export class OuterClickRemoveController {
    constructor(host) {
        this.onClick = (e) => {
            if (e.target !== this.host) {
                this.host.remove();
            }
        };
        (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("click", this.onClick);
    }
    hostDisconnected() {
        document.removeEventListener("click", this.onClick);
    }
}
