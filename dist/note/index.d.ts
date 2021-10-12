import { LitElement } from 'lit';
export declare class NoteElement extends LitElement {
    static styles: import("lit").CSSResult;
    _hosted: number;
    _minShowTime: number;
    getSize(): {
        width: number;
        height: number;
    };
    show(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    handleClick: (e: Event) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'note-element': NoteElement;
    }
}
