
const _set = new Set()

export const getRootRalitive = (current: Node) => {
    _set.clear()
    while(window.getComputedStyle(current as HTMLElement).position !== 'relative'){
        if((current as HTMLElement).shadowRoot){
            const slot = (current as HTMLElement).shadowRoot!.querySelector('slot:not([name])')
            if(slot && !_set.has(slot)){
                _set.add(slot)
                current = slot
            }
        }
        current = current.parentNode!
        if(current instanceof ShadowRoot){
            current = current.host            
        }
        if(current === document.body || !current){
            return document.body
        }

    }
    return current as HTMLElement
}