export class EnterController {
    constructor(host) {
        this.onKeypress = (e) => {
            if (e.key === "Enter") {
                this.host.onkeyEnter();
            }
        };
        (this.host = host).addController(this);
    }
    hostConnected() {
        document.addEventListener("keypress", this.onKeypress);
    }
    hostDisconnected() {
        document.removeEventListener("keypress", this.onKeypress);
    }
}
