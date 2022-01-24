import { LitElement } from 'lit';
export declare class LitNote extends LitElement {
    static styles: import("lit").CSSResult;
    private _hosted;
    private _minShowTime;
    private _handle;
    getSize(): {
        width: number;
        height: number;
    };
    show(): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    handleClick(e: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-note': LitNote;
    }
}
