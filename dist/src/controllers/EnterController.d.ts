import { ReactiveController, ReactiveControllerHost } from 'lit';
interface IKeyEnterControllerHost extends ReactiveControllerHost {
    onkeyEnter(): void;
}
export declare class EnterController implements ReactiveController {
    host: IKeyEnterControllerHost;
    constructor(host: IKeyEnterControllerHost);
    hostConnected(): void;
    hostDisconnected(): void;
    onKeypress: (e: KeyboardEvent) => void;
}
export {};
