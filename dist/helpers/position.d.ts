declare type TAlign = 'middle' | 'left' | 'right' | 'smart';
declare type TPositionNote = {
    height: number;
    width: number;
    alignX?: TAlign;
    alignY?: TAlign;
};
export declare const calcPositionForNote: (el: HTMLElement, data: TPositionNote) => {
    x: number;
    y: number;
};
export {};
