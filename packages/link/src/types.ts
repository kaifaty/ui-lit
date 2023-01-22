
export type LinkTarget = '_blank' | '_parent' | '_self' | '_top'

export interface ILinkProps {
    href?: string
    rel?: string
    target?: LinkTarget
    underlined?: boolean
}