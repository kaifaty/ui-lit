
export type TLinkTartget = "_blank" | "_parent" | "_self" | "_top"

export interface ILinkProps {
    href?: string
    rel?: string
    target?: TLinkTartget
    underlined?: boolean

}