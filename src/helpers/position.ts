const yMiddle = (bound: DOMRect, tooltip: HTMLElement) => 
    bound.top + bound.height / 2 - tooltip.clientHeight / 2 + window.scrollY

const yTop = (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement) => 
    bound.top - tooltip.clientHeight  + window.scrollY

const yBottom = (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement) => 
    bound.top + bound.height  + window.scrollY

const ySmartPosType =  (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement): 
    'bottom' | 'top' => {
        const expectedBottom = window.innerHeight - bound.bottom - tooltip.clientHeight        
        return expectedBottom > 0 
                        ? 'bottom'
                        : 'top'
    }

const xMiddle = (bound: DOMRect, tooltip: HTMLElement) => 
    bound.left + bound.width / 2 - tooltip.clientWidth / 2

const xRight = (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement) => 
    bound.left + bound.width 

const xLeft = (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement) => 
    bound.left - tooltip.clientWidth 

const xSmartPos =  (bound: DOMRect, tooltip: HTMLElement, element: HTMLElement): number => {
    const expectedRight = bound.right  + tooltip.clientWidth
    if(expectedRight < window.innerWidth) {
        return xRight(bound, tooltip, element)
    }
    return window.innerWidth - tooltip.clientWidth - 20
}
/*
export const calcXposition = (
    position: HorizontalPosition,
    bound: DOMRect, 
    tooltip: HTMLElement,
    element: HTMLElement, 
): number => {
    if(position === 'middle'){
        return xMiddle(bound, tooltip);
    }
    if(position === "right"){
        return xRight(bound, tooltip, element);        
    }    
    if(position === "left"){
        return xLeft(bound, tooltip, element);
    }
    return xSmartPos(bound, tooltip, element);
}
export const calcYposition = (
    position: VerticalPosition,
    bound: DOMRect, 
    tooltip: HTMLElement,
    element: HTMLElement, 
): number => {
    if(position === 'middle'){
        return yMiddle(bound, tooltip);
    }
    if(position === 'top'){
        return yTop(bound, tooltip, element);
    }
    if(position === 'bottom'){
        return yBottom(bound, tooltip, element);
    }
    
    return calcYposition(ySmartPosType(bound, tooltip, element), bound, tooltip, element);
};

export const calcOffset = (
    element: HTMLElement, 
    tooltip: HTMLElement
): [number, number] => {
    const bound = element.getBoundingClientRect();
    if(bound.width === 0 && bound.height === 0) return [-1, -1];
    return [
        calcXposition(element.horizontalPosition, bound, tooltip, element),
        calcYposition(element.verticalPosition, bound, tooltip, element),
    ]
}
export const setTooltipOffset = (
    tooltip: HTMLElement,
    x: number, 
    y: number
) => tooltip.style.transform = `translate(${x}px, ${y}px)`;
*/
type TAlign = 'middle' | 'left' | 'right' | 'smart';
type TPositionNote = {
    height: number, 
    width: number,
    alignX?: TAlign
    alignY?: TAlign
}
interface IDOMRect{
    top: number
    right:  number
    bottom: number
    left: number
    width: number
    height: number
    x: number
    y: number
}
interface IExtendDomRect extends IDOMRect{
    offsetTop: number
    offsetLeft: number
}

function getBoundingClientRect(el: HTMLElement): IDOMRect {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y      
    }
  }

const getY = (bound: IExtendDomRect, neededHeight: number, align: TAlign = 'smart') => {
    let y = 0
    if(bound.top - neededHeight < 0){
        y = bound.bottom  + window.scrollY
    }
    else{
        y = bound.top - neededHeight +  window.scrollY
    }
    return y
}

const getX = (bound: IExtendDomRect, nedeedWidth: number, align: TAlign = 'smart') => {
    let x = 0
    if(bound.left - nedeedWidth < 0){
        x = bound.left + window.scrollX
    }
    else{
        x = bound.left - nedeedWidth + window.scrollX
    }
    return x
}

export const calcPositionForPopup = (el: HTMLElement, data: TPositionNote) => {
    const offsetTop = el.offsetTop
    const offsetLeft = el.offsetLeft
    const bound: IExtendDomRect = {...getBoundingClientRect(el), offsetTop, offsetLeft}

    const y = getY(bound, data.height, data.alignY)
    const x = getX(bound, data.width, data.alignX)
    return {x, y}

}