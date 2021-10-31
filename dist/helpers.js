export const getEventDataset = (e, data) => {
    return e.target.closest(".option").dataset[data];
};
export const isChildOfElement = (el, target) => {
    while (el.parentElement) {
        if (el === target) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
};
