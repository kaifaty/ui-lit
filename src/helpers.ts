
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