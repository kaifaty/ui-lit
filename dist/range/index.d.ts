import { ResizeObserverController } from './../controllers/ResizeObserverController';
import { LitElement, TemplateResult } from 'lit';
import type { FormAssociated } from '../form-associated/interface';
export interface IRangeProps extends FormAssociated {
    value: string;
    valueAsNumber: number;
    min: number;
    max: number;
    noteHidden: boolean;
    usePoints: boolean;
    startFromMin: boolean;
    showPercent: boolean;
}
declare const LitRange_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
/** <lit-range></lit-range> */
export declare class LitRange extends LitRange_base {
    static get styles(): import("lit").CSSResult[];
    static get properties(): {
        value: {
            type: StringConstructor;
            hasChanged: () => boolean;
        };
        min: {
            type: NumberConstructor;
        };
        max: {
            type: NumberConstructor;
        };
    };
    private _isMoving;
    offsetX: number;
    isPercentHidden: boolean;
    disabledByVol: boolean;
    decimals: number;
    showPercent: boolean;
    usePoints: boolean;
    startFromMin: boolean;
    _wrapper: HTMLElement;
    RO: ResizeObserverController;
    _points: number[];
    _timeout: number;
    _trackSize: number;
    _trackStartX: number;
    _thumbSize: number;
    _padding: number;
    _rect: DOMRect | null;
    _min: number;
    _percent: number;
    get min(): number;
    set min(value: number);
    _max: number;
    get max(): number;
    set max(value: number);
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    _value: string;
    get value(): string;
    set value(value: string);
    isDisabled(): boolean;
    willUpdate(): void;
    dispatch: () => void;
    updated(props: Map<string, string | number | unknown>): void;
    get minPercent(): number;
    private _calcTrackStartX;
    private _calcTackWidth;
    private _calcOffset;
    private _calcPercentByOffset;
    private _calcPercentByValue;
    private _calcValueByPercent;
    private _updateOffset;
    private _hidePercent;
    private _movePosition;
    setPercent(value: number): void;
    private _handlePointerDown;
    private _handlePointerMove;
    private _handlePointerUp;
    private _handlePointOver;
    private _handlePointLeave;
    private _pointersTemplate;
    private _percentTemplate;
    private _blockedVolume;
    private _thumbTemplate;
    render(): TemplateResult<1>;
    _onChangeSize: (rect: DOMRect) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-range': LitRange;
    }
}
export {};
