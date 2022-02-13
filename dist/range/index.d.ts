import { LitElement, CSSResultOrNative } from 'lit';
import type { FormAssociated } from '../mixins/form-associated/interface';
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
declare const LitRange_base: (new (...args: any[]) => import("../mixins/focusable/inderface").Focusable & LitElement) & (new (...args: any[]) => import("../mixins/labled/inderface").ILabled) & (new (...args: any[]) => import("../mixins/form-associated/interface").FormAssociatedElement) & (new (...args: any[]) => import("../mixins/form-associated/interface").FormAssociatedElement) & typeof LitElement;
/**
 * <lit-range></lit-range>
 *
 * @cssprop --lit-range-thumb-size Thumb size
 *
 * @cssprop --lit-range-track Track color
 * @cssprop --lit-range-track-hover Track color when hovered
 *
 * @cssprop --lit-range-thumb Thumb color
 * @cssprop --lit-range-thumb-shadow Thumb shadow
 *
 * @cssprop --lit-range-points-background Points background
 *
 * @cssprop --lit-range-filled Fillted color
 * @cssprop --lit-range-filled-hover Fillted color
 *
 *
 * @cssprop --lit-range-outline-focus Outline when focused
 *
 * */
export declare class LitRange extends LitRange_base {
    static get styles(): CSSResultOrNative[];
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
    isPercentHidden: boolean;
    disabledByVol: boolean;
    decimals: number;
    showPercent: boolean;
    usePoints: boolean;
    startFromMin: boolean;
    _wrapper: HTMLElement;
    private _RO;
    private _points;
    private _timeout;
    private _trackSize;
    private _trackStartX;
    private _thumbSize;
    private _padding;
    private _rect;
    private _min;
    private _percent;
    private _offsetX;
    private _lastX;
    tabindex: number;
    get offsetX(): number;
    get min(): number;
    set min(value: number);
    private _max;
    get max(): number;
    set max(value: number);
    get percent(): number;
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    private _value;
    get value(): string;
    set value(value: string);
    get minPercent(): number;
    isDisabled(): boolean;
    connectedCallback(): void;
    willUpdate(): void;
    updated(props: Map<string, unknown>): void;
    private _pointersTemplate;
    private _percentTemplate;
    private _thumbTemplate;
    render(): import("lit").TemplateResult<1>;
    private _recalcValue;
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
    private _onPreventTouch;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerLostCapture;
    private _onPointerOver;
    private _onChangeSize;
    private _handlePointerDown;
    private _handlePointerUp;
    private _handlePointerMove;
    private _onPointOver;
    private _onPointLeave;
    private _handleKeyboard;
    notify(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-range': LitRange;
    }
}
export {};
