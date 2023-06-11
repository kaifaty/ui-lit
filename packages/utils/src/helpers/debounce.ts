export const debounce = (f: (...args: any[]) => any, time: number) => {
  let timer = 0
  return (...args: any[]) => {
    clearInterval(timer)
    timer = window.setTimeout(() => {
      f(...args)
    }, time)
  }
}
