
export interface IUIEvent extends UIEvent{
    layerX: number,
    clientX?: number,
    layerY: number,
    target: HTMLElement,
    targetTouches?: TouchList
    touches ?: TouchList
    changedTouches ?: TouchList
}
export const getParentTagName = (el: HTMLElement, tagName: string) => {
    let current: HTMLElement | null = el;
    while(current){
        if(current.tagName.toLowerCase() === tagName){
            return current;
        }
        current = current.parentElement!;
    }
    return null;    
}
export const getRootElement = (el: HTMLElement) => {
    while(el.parentElement){
        el = el.parentElement;
    }
    return el;
}
export const isClickInElement = (e: Event, root: HTMLElement) => {
    for(const el of e.composedPath()){
        if(el === root){
            return true;
        }
    }
    return false
}
export const getClientX = (e: IUIEvent) => {
    const clientx =  e.clientX || e.targetTouches?.[0].clientX || 0; 
    return clientx;
}
export const isiOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

export const getEventDataset = (e: Event, data: string) => {
    return ((e.target as HTMLElement).closest(".option") as HTMLElement).dataset[data]!
}

export const isChildOfElement = (el: HTMLElement, target: HTMLElement) => {
    while(el.parentElement){
        if(el === target){
            return true
        }
        el = el.parentElement;
    }
    return false;
}