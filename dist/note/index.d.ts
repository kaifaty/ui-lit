import { LitElement } from 'lit';
export declare class NoteElement extends LitElement {
    static styles: import("lit").CSSResult;
    getSize(): {
        width: number;
        height: number;
    };
    show(): void;
    render(): import("lit-html").TemplateResult<1>;
}
