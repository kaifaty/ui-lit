export const getButtonSync = (target: HTMLElement) => {
  return target.shadowRoot.querySelector<HTMLLinkElement>('#button')
}
export const getButton = async (target: HTMLElement) => {
  await 1
  return getButtonSync(target)
}
