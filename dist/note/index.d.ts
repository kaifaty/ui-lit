import { LitElement } from 'lit';
import { OuterClickRemoveController } from '../controllers/OuterClickRemoveController';
export declare class LitNote extends LitElement {
    static styles: import("lit").CSSResult;
    _hosted: number;
    _minShowTime: number;
    _handle: OuterClickRemoveController;
    getSize(): {
        width: number;
        height: number;
    };
    show(): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    handleClick(e: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-note': LitNote;
    }
}
