const yMiddle = (bound, tooltip) => bound.top + bound.height / 2 - tooltip.clientHeight / 2 + window.scrollY;
const yTop = (bound, tooltip, element) => bound.top - tooltip.clientHeight + window.scrollY;
const yBottom = (bound, tooltip, element) => bound.top + bound.height + window.scrollY;
const ySmartPosType = (bound, tooltip, element) => {
    const expectedBottom = window.innerHeight - bound.bottom - tooltip.clientHeight;
    return expectedBottom > 0
        ? "bottom"
        : 'top';
};
const xMiddle = (bound, tooltip) => bound.left + bound.width / 2 - tooltip.clientWidth / 2;
const xRight = (bound, tooltip, element) => bound.left + bound.width;
const xLeft = (bound, tooltip, element) => bound.left - tooltip.clientWidth;
const xSmartPos = (bound, tooltip, element) => {
    const expectedRight = bound.right + tooltip.clientWidth;
    if (expectedRight < window.innerWidth) {
        return xRight(bound, tooltip, element);
    }
    return window.innerWidth - tooltip.clientWidth - 20;
};
function getBoundingClientRect(el) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
    };
}
const getY = (bound, neededHeight, align = 'smart') => {
    let y = 0;
    if (bound.top - neededHeight < 0) {
        y = bound.bottom + window.scrollY;
    }
    else {
        y = bound.top - neededHeight + window.scrollY;
    }
    return y;
};
const getX = (bound, nedeedWidth, align = 'smart') => {
    let x = 0;
    if (bound.left - nedeedWidth < 0) {
        x = bound.left + window.scrollX;
        ;
    }
    else {
        x = bound.left - nedeedWidth + window.scrollX;
    }
    return x;
};
export const calcPositionForPopup = (el, data) => {
    const offsetTop = el.offsetTop;
    const offsetLeft = el.offsetLeft;
    const bound = { ...getBoundingClientRect(el), offsetTop, offsetLeft };
    const y = getY(bound, data.height, data.alignY);
    const x = getX(bound, data.width, data.alignX);
    return { x, y };
};
