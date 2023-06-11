export const isLCHSupports = () => {
  return globalThis.CSS?.supports('color', 'oklch(0% 0 0%)')
}
