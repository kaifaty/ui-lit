import type {LitElement, PropertyDeclaration, PropertyValueMap, ReactiveController, RenderOptions} from 'lit'

import type {LitLabel} from '../../components/label/index'
import type {FormAssociatedElement} from '../form-associated'
import type {Constructor} from '../types.js'

export interface ILabled extends LitElement {
  readonly labels: LitLabel[]
  addLabel(data: LitLabel): void
  removeLabel(data: LitLabel): void
}

/**
 * Mixin append labels for component
 */
export const labled = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
  class LabledElement extends superClass implements ILabled {
    renderOptions: RenderOptions
    protected createRenderRoot(): Element | ShadowRoot {
      throw new Error('Method not implemented.')
    }
    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      throw new Error('Method not implemented.')
    }
    protected render(): unknown {
      throw new Error('Method not implemented.')
    }
    renderRoot: HTMLElement | ShadowRoot
    isUpdatePending: boolean
    hasUpdated: boolean
    addController(controller: ReactiveController): void {
      throw new Error('Method not implemented.')
    }
    removeController(controller: ReactiveController): void {
      throw new Error('Method not implemented.')
    }
    protected enableUpdating(_requestedUpdate: boolean): void {
      throw new Error('Method not implemented.')
    }
    attributeChangedCallback(name: string, _old: string, value: string): void {
      throw new Error('Method not implemented.')
    }
    requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown>,
    ): void {
      throw new Error('Method not implemented.')
    }
    protected scheduleUpdate(): void | Promise<unknown> {
      throw new Error('Method not implemented.')
    }
    protected performUpdate(): void | Promise<unknown> {
      throw new Error('Method not implemented.')
    }
    get updateComplete(): Promise<boolean> {
      throw new Error('Method not implemented.')
    }
    protected getUpdateComplete(): Promise<boolean> {
      throw new Error('Method not implemented.')
    }
    protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
      throw new Error('Method not implemented.')
    }
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      throw new Error('Method not implemented.')
    }
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      throw new Error('Method not implemented.')
    }
    accessKey: string
    accessKeyLabel: string
    autocapitalize: string
    dir: string
    draggable: boolean
    hidden: boolean
    inert: boolean
    innerText: string
    lang: string
    offsetHeight: number
    offsetLeft: number
    offsetParent: Element
    offsetTop: number
    offsetWidth: number
    outerText: string
    spellcheck: boolean
    title: string
    translate: boolean
    attachInternals(): ElementInternals {
      throw new Error('Method not implemented.')
    }
    click(): void {
      throw new Error('Method not implemented.')
    }
    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): void
    addEventListener(type: unknown, listener: unknown, options?: unknown): void {
      throw new Error('Method not implemented.')
    }
    removeEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ): void
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions,
    ): void
    removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
      throw new Error('Method not implemented.')
    }
    attributes: NamedNodeMap
    classList: DOMTokenList
    className: string
    clientHeight: number
    clientLeft: number
    clientTop: number
    clientWidth: number
    id: string
    localName: string
    namespaceURI: string
    onfullscreenchange: (this: Element, ev: Event) => any
    onfullscreenerror: (this: Element, ev: Event) => any
    outerHTML: string
    ownerDocument: Document
    part: DOMTokenList
    prefix: string
    scrollHeight: number
    scrollLeft: number
    scrollTop: number
    scrollWidth: number
    shadowRoot: ShadowRoot
    slot: string
    tagName: string
    attachShadow(init: ShadowRootInit): ShadowRoot {
      throw new Error('Method not implemented.')
    }
    closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K]
    closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K]
    closest<E extends Element = Element>(selectors: string): E
    closest(selectors: unknown): E | HTMLElementTagNameMap[K] | SVGElementTagNameMap[K] {
      throw new Error('Method not implemented.')
    }
    getAttribute(qualifiedName: string): string {
      throw new Error('Method not implemented.')
    }
    getAttributeNS(namespace: string, localName: string): string {
      throw new Error('Method not implemented.')
    }
    getAttributeNames(): string[] {
      throw new Error('Method not implemented.')
    }
    getAttributeNode(qualifiedName: string): Attr {
      throw new Error('Method not implemented.')
    }
    getAttributeNodeNS(namespace: string, localName: string): Attr {
      throw new Error('Method not implemented.')
    }
    getBoundingClientRect(): DOMRect {
      throw new Error('Method not implemented.')
    }
    getClientRects(): DOMRectList {
      throw new Error('Method not implemented.')
    }
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
      throw new Error('Method not implemented.')
    }
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
      qualifiedName: K,
    ): HTMLCollectionOf<HTMLElementTagNameMap[K]>
    getElementsByTagName<K extends keyof SVGElementTagNameMap>(
      qualifiedName: K,
    ): HTMLCollectionOf<SVGElementTagNameMap[K]>
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>
    getElementsByTagName(
      qualifiedName: unknown,
    ):
      | HTMLCollectionOf<Element>
      | HTMLCollectionOf<HTMLElementTagNameMap[K]>
      | HTMLCollectionOf<SVGElementTagNameMap[K]> {
      throw new Error('Method not implemented.')
    }
    getElementsByTagNameNS(
      namespaceURI: 'http://www.w3.org/1999/xhtml',
      localName: string,
    ): HTMLCollectionOf<HTMLElement>
    getElementsByTagNameNS(
      namespaceURI: 'http://www.w3.org/2000/svg',
      localName: string,
    ): HTMLCollectionOf<SVGElement>
    getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>
    getElementsByTagNameNS(
      namespace: unknown,
      localName: unknown,
    ): HTMLCollectionOf<Element> | HTMLCollectionOf<HTMLElement> | HTMLCollectionOf<SVGElement> {
      throw new Error('Method not implemented.')
    }
    hasAttribute(qualifiedName: string): boolean {
      throw new Error('Method not implemented.')
    }
    hasAttributeNS(namespace: string, localName: string): boolean {
      throw new Error('Method not implemented.')
    }
    hasAttributes(): boolean {
      throw new Error('Method not implemented.')
    }
    hasPointerCapture(pointerId: number): boolean {
      throw new Error('Method not implemented.')
    }
    insertAdjacentElement(where: InsertPosition, element: Element): Element {
      throw new Error('Method not implemented.')
    }
    insertAdjacentHTML(position: InsertPosition, text: string): void {
      throw new Error('Method not implemented.')
    }
    insertAdjacentText(where: InsertPosition, data: string): void {
      throw new Error('Method not implemented.')
    }
    matches(selectors: string): boolean {
      throw new Error('Method not implemented.')
    }
    releasePointerCapture(pointerId: number): void {
      throw new Error('Method not implemented.')
    }
    removeAttribute(qualifiedName: string): void {
      throw new Error('Method not implemented.')
    }
    removeAttributeNS(namespace: string, localName: string): void {
      throw new Error('Method not implemented.')
    }
    removeAttributeNode(attr: Attr): Attr {
      throw new Error('Method not implemented.')
    }
    requestFullscreen(options?: FullscreenOptions): Promise<void> {
      throw new Error('Method not implemented.')
    }
    requestPointerLock(): void {
      throw new Error('Method not implemented.')
    }
    scroll(options?: ScrollToOptions): void
    scroll(x: number, y: number): void
    scroll(x?: unknown, y?: unknown): void {
      throw new Error('Method not implemented.')
    }
    scrollBy(options?: ScrollToOptions): void
    scrollBy(x: number, y: number): void
    scrollBy(x?: unknown, y?: unknown): void {
      throw new Error('Method not implemented.')
    }
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
      throw new Error('Method not implemented.')
    }
    scrollTo(options?: ScrollToOptions): void
    scrollTo(x: number, y: number): void
    scrollTo(x?: unknown, y?: unknown): void {
      throw new Error('Method not implemented.')
    }
    setAttribute(qualifiedName: string, value: string): void {
      throw new Error('Method not implemented.')
    }
    setAttributeNS(namespace: string, qualifiedName: string, value: string): void {
      throw new Error('Method not implemented.')
    }
    setAttributeNode(attr: Attr): Attr {
      throw new Error('Method not implemented.')
    }
    setAttributeNodeNS(attr: Attr): Attr {
      throw new Error('Method not implemented.')
    }
    setPointerCapture(pointerId: number): void {
      throw new Error('Method not implemented.')
    }
    toggleAttribute(qualifiedName: string, force?: boolean): boolean {
      throw new Error('Method not implemented.')
    }
    webkitMatchesSelector(selectors: string): boolean {
      throw new Error('Method not implemented.')
    }
    baseURI: string
    childNodes: NodeListOf<ChildNode>
    firstChild: ChildNode
    isConnected: boolean
    lastChild: ChildNode
    nextSibling: ChildNode
    nodeName: string
    nodeType: number
    nodeValue: string
    parentElement: HTMLElement
    parentNode: ParentNode
    previousSibling: ChildNode
    textContent: string
    appendChild<T extends Node>(node: T): T {
      throw new Error('Method not implemented.')
    }
    cloneNode(deep?: boolean): Node {
      throw new Error('Method not implemented.')
    }
    compareDocumentPosition(other: Node): number {
      throw new Error('Method not implemented.')
    }
    contains(other: Node): boolean {
      throw new Error('Method not implemented.')
    }
    getRootNode(options?: GetRootNodeOptions): Node {
      throw new Error('Method not implemented.')
    }
    hasChildNodes(): boolean {
      throw new Error('Method not implemented.')
    }
    insertBefore<T extends Node>(node: T, child: Node): T {
      throw new Error('Method not implemented.')
    }
    isDefaultNamespace(namespace: string): boolean {
      throw new Error('Method not implemented.')
    }
    isEqualNode(otherNode: Node): boolean {
      throw new Error('Method not implemented.')
    }
    isSameNode(otherNode: Node): boolean {
      throw new Error('Method not implemented.')
    }
    lookupNamespaceURI(prefix: string): string {
      throw new Error('Method not implemented.')
    }
    lookupPrefix(namespace: string): string {
      throw new Error('Method not implemented.')
    }
    normalize(): void {
      throw new Error('Method not implemented.')
    }
    removeChild<T extends Node>(child: T): T {
      throw new Error('Method not implemented.')
    }
    replaceChild<T extends Node>(node: Node, child: T): T {
      throw new Error('Method not implemented.')
    }
    ATTRIBUTE_NODE: number
    CDATA_SECTION_NODE: number
    COMMENT_NODE: number
    DOCUMENT_FRAGMENT_NODE: number
    DOCUMENT_NODE: number
    DOCUMENT_POSITION_CONTAINED_BY: number
    DOCUMENT_POSITION_CONTAINS: number
    DOCUMENT_POSITION_DISCONNECTED: number
    DOCUMENT_POSITION_FOLLOWING: number
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number
    DOCUMENT_POSITION_PRECEDING: number
    DOCUMENT_TYPE_NODE: number
    ELEMENT_NODE: number
    ENTITY_NODE: number
    ENTITY_REFERENCE_NODE: number
    NOTATION_NODE: number
    PROCESSING_INSTRUCTION_NODE: number
    TEXT_NODE: number
    dispatchEvent(event: Event): boolean {
      throw new Error('Method not implemented.')
    }
    ariaAtomic: string
    ariaAutoComplete: string
    ariaBusy: string
    ariaChecked: string
    ariaColCount: string
    ariaColIndex: string
    ariaColIndexText: string
    ariaColSpan: string
    ariaCurrent: string
    ariaDisabled: string
    ariaExpanded: string
    ariaHasPopup: string
    ariaHidden: string
    ariaInvalid: string
    ariaKeyShortcuts: string
    ariaLabel: string
    ariaLevel: string
    ariaLive: string
    ariaModal: string
    ariaMultiLine: string
    ariaMultiSelectable: string
    ariaOrientation: string
    ariaPlaceholder: string
    ariaPosInSet: string
    ariaPressed: string
    ariaReadOnly: string
    ariaRequired: string
    ariaRoleDescription: string
    ariaRowCount: string
    ariaRowIndex: string
    ariaRowIndexText: string
    ariaRowSpan: string
    ariaSelected: string
    ariaSetSize: string
    ariaSort: string
    ariaValueMax: string
    ariaValueMin: string
    ariaValueNow: string
    ariaValueText: string
    role: string
    animate(
      keyframes: Keyframe[] | PropertyIndexedKeyframes,
      options?: number | KeyframeAnimationOptions,
    ): Animation {
      throw new Error('Method not implemented.')
    }
    getAnimations(options?: GetAnimationsOptions): Animation[] {
      throw new Error('Method not implemented.')
    }
    after(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    before(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    remove(): void {
      throw new Error('Method not implemented.')
    }
    replaceWith(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    innerHTML: string
    nextElementSibling: Element
    previousElementSibling: Element
    childElementCount: number
    children: HTMLCollection
    firstElementChild: Element
    lastElementChild: Element
    append(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    prepend(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K]
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K]
    querySelector<E extends Element = Element>(selectors: string): E
    querySelector(selectors: unknown): E | HTMLElementTagNameMap[K] | SVGElementTagNameMap[K] {
      throw new Error('Method not implemented.')
    }
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(
      selectors: K,
    ): NodeListOf<HTMLElementTagNameMap[K]>
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>
    querySelectorAll(
      selectors: unknown,
    ): NodeListOf<HTMLElementTagNameMap[K]> | NodeListOf<SVGElementTagNameMap[K]> | NodeListOf<E> {
      throw new Error('Method not implemented.')
    }
    replaceChildren(...nodes: (string | Node)[]): void {
      throw new Error('Method not implemented.')
    }
    assignedSlot: HTMLSlotElement
    oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any
    oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any
    onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any
    style: CSSStyleDeclaration
    contentEditable: string
    enterKeyHint: string
    inputMode: string
    isContentEditable: boolean
    onabort: (this: GlobalEventHandlers, ev: UIEvent) => any
    onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any
    onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any
    onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any
    onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any
    onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any
    onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any
    oncancel: (this: GlobalEventHandlers, ev: Event) => any
    oncanplay: (this: GlobalEventHandlers, ev: Event) => any
    oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any
    onchange: (this: GlobalEventHandlers, ev: Event) => any
    onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onclose: (this: GlobalEventHandlers, ev: Event) => any
    oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any
    oncuechange: (this: GlobalEventHandlers, ev: Event) => any
    ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any
    ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any
    ondurationchange: (this: GlobalEventHandlers, ev: Event) => any
    onemptied: (this: GlobalEventHandlers, ev: Event) => any
    onended: (this: GlobalEventHandlers, ev: Event) => any
    onerror: OnErrorEventHandlerNonNull
    onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any
    onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any
    ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any
    oninput: (this: GlobalEventHandlers, ev: Event) => any
    oninvalid: (this: GlobalEventHandlers, ev: Event) => any
    onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any
    onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any
    onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any
    onload: (this: GlobalEventHandlers, ev: Event) => any
    onloadeddata: (this: GlobalEventHandlers, ev: Event) => any
    onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any
    onloadstart: (this: GlobalEventHandlers, ev: Event) => any
    onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any
    onpause: (this: GlobalEventHandlers, ev: Event) => any
    onplay: (this: GlobalEventHandlers, ev: Event) => any
    onplaying: (this: GlobalEventHandlers, ev: Event) => any
    onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any
    onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any
    onratechange: (this: GlobalEventHandlers, ev: Event) => any
    onreset: (this: GlobalEventHandlers, ev: Event) => any
    onresize: (this: GlobalEventHandlers, ev: UIEvent) => any
    onscroll: (this: GlobalEventHandlers, ev: Event) => any
    onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any
    onseeked: (this: GlobalEventHandlers, ev: Event) => any
    onseeking: (this: GlobalEventHandlers, ev: Event) => any
    onselect: (this: GlobalEventHandlers, ev: Event) => any
    onselectionchange: (this: GlobalEventHandlers, ev: Event) => any
    onselectstart: (this: GlobalEventHandlers, ev: Event) => any
    onslotchange: (this: GlobalEventHandlers, ev: Event) => any
    onstalled: (this: GlobalEventHandlers, ev: Event) => any
    onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any
    onsuspend: (this: GlobalEventHandlers, ev: Event) => any
    ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any
    ontoggle: (this: GlobalEventHandlers, ev: Event) => any
    ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any
    ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any
    ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any
    ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any
    ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any
    ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any
    ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any
    ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any
    onvolumechange: (this: GlobalEventHandlers, ev: Event) => any
    onwaiting: (this: GlobalEventHandlers, ev: Event) => any
    onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any
    onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any
    onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any
    onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any
    onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any
    autofocus: boolean
    dataset: DOMStringMap
    nonce?: string
    tabIndex: number
    blur(): void {
      throw new Error('Method not implemented.')
    }
    focus(options?: FocusOptions): void {
      throw new Error('Method not implemented.')
    }
    #labels: LitLabel[] = []

    /** @ignore  */
    #notify() {
      this.dispatchEvent(
        new CustomEvent('labledConnected', {
          composed: true,
          bubbles: true,
          detail: this,
        }),
      )
    }

    /** @ignore  */
    #updateDisabled() {
      this.#labels.forEach((it) => {
        if (this.disabled) {
          it.setAttribute('disabled', '')
        } else {
          it.removeAttribute('disabled')
        }
      })
    }

    /** @ignore  */
    #getExistLabelIndex(label: LitLabel) {
      return this.#labels.findIndex((el) => el === label)
    }

    get labels() {
      return this.#labels
    }

    /**
     * @param label {LitLabel} - custom label
     */
    addLabel(label: LitLabel): void {
      const i = this.#getExistLabelIndex(label)
      if (i >= 0) return
      this.#labels.push(label)
      this.#updateDisabled()
    }

    /**
     * @param label {LitLabel} - custom label
     */
    removeLabel(label: LitLabel): void {
      const i = this.#getExistLabelIndex(label)
      if (i < 0) return
      this.#labels.splice(i, 1)
      this.#labels = this.#labels.filter((l) => l !== label)
    }

    /** @ignore  */
    willUpdate(props: PropertyValueMap<any>) {
      super.willUpdate(props)
      if (props.has('disabled')) {
        this.#updateDisabled()
      }
    }

    /** @ignore  */
    connectedCallback() {
      super.connectedCallback()
      this.#notify()
    }

    /** @ignore  */
    disconnectedCallback() {
      super.disconnectedCallback()
      this.#labels = []
    }
  }
  return LabledElement as Constructor<ILabled> & T
}
