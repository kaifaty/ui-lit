import { Directive, directive } from 'lit/directive';
class InputValueDirective extends Directive {
    render(value) {
        return value;
    }
    update(part, args) {
        const input = part.element;
        if (input.value !== args[0]) {
            input.value = args[0];
        }
        return this.render(...args);
    }
}
export const inputDirective = directive(InputValueDirective);
