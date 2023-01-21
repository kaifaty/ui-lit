import {directive, Directive, PartInfo, PropertyPart} from 'lit/directive.js'

class InputValueDirective extends Directive {
    render(value: string){
        return value
    }
    update(part: PropertyPart, args: [string]){
        const input = (part.element as HTMLInputElement)
        if(input.value !== args[0]){
            input.value = args[0]
        }
        return this.render(...args)
    }
}
export const inputDirective = directive(InputValueDirective)

