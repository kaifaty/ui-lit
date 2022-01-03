import { LitElement } from 'lit';
import { ILabled } from '../mixins/labled/inderface';
export declare class LitLabel extends LitElement {
    static styles: import("lit").CSSResult;
    for: string;
    private _labled;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    get labled(): ILabled | null;
    protected setLabled(labeled: ILabled): void;
    private _disconnectLabels;
    private _connectByFor;
    private _onLabledConnected;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-label': LitLabel;
    }
}
