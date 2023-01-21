import {LitElement} from 'lit'

export interface Focusable extends LitElement{
    autofocus: boolean,
    readonly isFocused: boolean
    focus(): void
}