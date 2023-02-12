export type WCStyleSheet = CSSStyleSheet | string

export const supportsAdoptingStyleSheets =
  global.ShadowRoot && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype

/**
 * Create css styles
 */
export const createStyle = (styles: string): WCStyleSheet => {
  if (supportsAdoptingStyleSheets) {
    const result = new CSSStyleSheet()
    result.replaceSync(styles)
    return result
  }
  return styles
}

/**
 * Adoption styles to elelement
 */
export const adoptToElement = (element: HTMLElement, styles: WCStyleSheet[]) => {
  if (!styles.length) {
    return
  }
  if (typeof styles[0] === 'string') {
    styles.forEach((s) => {
      const v = document.createElement('style')
      v.textContent = s as string
      element.appendChild(v)
    })
  } else {
    element.shadowRoot.adoptedStyleSheets = [
      ...new Set([...element.shadowRoot.adoptedStyleSheets, ...(styles as CSSStyleSheet[])]),
    ]
  }
}
