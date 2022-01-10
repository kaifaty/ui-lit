import { Directive, PropertyPart } from 'lit/directive.js';
declare class InputValueDirective extends Directive {
    render(value: string): string;
    update(part: PropertyPart, args: [string]): string;
}
export declare const inputDirective: (value: string) => import("lit/directive.js").DirectiveResult<typeof InputValueDirective>;
export {};
