
export type TTheme = 'light' | 'dark';
export interface IThemeProps{
    theme: TTheme
}

export type HCL = [number, number, number];
export type PalleteName = 'primary' | 'positive' | 'negative'
export type TPallets = Record<PalleteName | string, HCL>;