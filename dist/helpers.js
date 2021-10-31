export const getParentTagName = (el, tagName) => {
    let current = el;
    while (current) {
        if (current.tagName.toLowerCase() === tagName) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
};
export const getRootElement = (el) => {
    while (el.parentElement) {
        el = el.parentElement;
    }
    return el;
};
export const isClickInElement = (e, root) => {
    for (const el of e.composedPath()) {
        if (el === root) {
            return true;
        }
    }
    return false;
};
export const getClientX = (e) => {
    var _a;
    const clientx = e.clientX || ((_a = e.targetTouches) === null || _a === void 0 ? void 0 : _a[0].clientX) || 0;
    return clientx;
};
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
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};
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
