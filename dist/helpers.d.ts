export interface IUIEvent extends UIEvent {
    layerX: number;
    clientX?: number;
    layerY: number;
    target: HTMLElement;
    targetTouches?: TouchList;
    touches?: TouchList;
    changedTouches?: TouchList;
}
export declare const getParentTagName: (el: HTMLElement, tagName: string) => HTMLElement | null;
export declare const getRootElement: (el: HTMLElement) => HTMLElement;
export declare const getClientX: (e: IUIEvent) => number;
export declare const isiOS: () => boolean;
export declare const getEventDataset: (e: Event, data: string) => string;
export declare const isChildOfElement: (el: HTMLElement, target: HTMLElement) => boolean;
