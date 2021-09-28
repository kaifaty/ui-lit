import { ReactiveController, LitElement } from 'lit';
export declare class OuterClickRemoveController implements ReactiveController {
    host: LitElement;
    constructor(host: LitElement);
    hostConnected(): void;
    hostDisconnected(): void;
    onClick: (e: Event) => void;
}
