export const clickPosition = (e: TouchEvent | MouseEvent, rect: DOMRect) => {
  if ('touches' in e) {
    return {
      x: e.targetTouches[0].clientX - rect.x,
      y: e.targetTouches[0].clientY - rect.y,
    }
  }

  return {
    x: e.clientX - rect.x,
    y: e.clientY - rect.y,
  }
}
