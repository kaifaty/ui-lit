
export interface IUIEvent extends UIEvent{
    layerX: number,
    clientX?: number,
    layerY: number,
    target: HTMLElement,
    targetTouches?: TouchList
    touches ?: TouchList
    changedTouches ?: TouchList
}

export const getRootElement = (el: HTMLElement) => {
    while(el.parentElement){
        el = el.parentElement;
    }
    return el;
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