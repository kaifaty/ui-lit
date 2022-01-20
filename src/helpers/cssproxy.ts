import { unsafeCSS, css, CSSResultOrNative } from 'lit';



export const makeCSSProxy = <T extends object>(data: T, prefix: string = '') => {
    return new Proxy(data, {
        get: (target, prop, receiver) => {
            if(prop in target){
                const value = Reflect.get(target, prop, receiver) ;
                const _default = value.default ? ", " + value.default : "";
                return unsafeCSS(`var(${prefix + value.name + _default})`)
            }
            else{
                console.warn(`undefined prop`, prop)
                return css``;
            }
        }
    }) as Record<keyof T, CSSResultOrNative>
}

export const makeCSSNameProxy = <T extends object>(data: T, prefix: string = '') => {
    return new Proxy(data, {
        get: (target, prop, receiver) => {
            if(prop in target){
                const value = Reflect.get(target, prop, receiver) ;
                return unsafeCSS(prefix + value.name)
            }
            else{
                console.warn(`undefined prop`, prop)
                return css``;
            }
        }
    }) as Record<keyof T, CSSResultOrNative>
}
