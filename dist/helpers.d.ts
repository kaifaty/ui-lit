export interface IUIEvent extends UIEvent {
    layerX: number;
    clientX?: number;
    layerY: number;
    target: HTMLElement;
    targetTouches?: TouchList;
    touches?: TouchList;
    changedTouches?: TouchList;
}
export declare const getRootElement: (el: HTMLElement) => HTMLElement;
export declare const getClientX: (e: IUIEvent) => number;
