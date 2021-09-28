import { Directive, PropertyPart } from 'lit/directive';
declare class InputValueDirective extends Directive {
    render(value: string): string;
    update(part: PropertyPart, args: [string]): string;
}
export declare const inputDirective: (value: string) => import("lit-html/directive").DirectiveResult<typeof InputValueDirective>;
export {};
