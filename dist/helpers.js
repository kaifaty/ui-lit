export const getRootElement = (el) => {
    while (el.parentElement) {
        el = el.parentElement;
    }
    return el;
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
