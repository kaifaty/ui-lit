export type TValidationMessageKey = keyof ValidityStateFlags;
export type TValidationMessages = Record<TValidationMessageKey, {[k: string] : string}>