import { ReactiveController, ReactiveControllerHost } from 'lit';
interface IClickControllerHost extends ReactiveControllerHost {
    handleClick(e: Event): void;
}
export declare class OuterClickRemoveController implements ReactiveController {
    host: IClickControllerHost;
    constructor(host: IClickControllerHost);
    hostConnected(): void;
    hostDisconnected(): void;
    handleClick: (e: Event) => void;
}
export {};
