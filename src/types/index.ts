export type UISelectChanged<T extends string = string> = CustomEvent<T>
export type UITextFieldChanged = CustomEvent<string>
export type UITabsChanged<T extends string> = CustomEvent<T>
export type UIRangeChanged = CustomEvent<{
    value: string
    percent: number
    valueAsNumber: number
    type: 'range'
}>
export type UIFormSubmit<T extends Record<string, unknown>> = CustomEvent<{data: T}>