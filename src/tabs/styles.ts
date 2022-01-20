import { makeCSSNameProxy } from './../helpers/cssproxy';
import { makeCSSProxy } from '../helpers/cssproxy';
export const TabsStyles = {
    outline: {
        name: "--lit-tabs-outline-focus",
        default: "1px dashed #999"
    },
    height: {
        name: "--lit-tab-height",
        default: "30px"
    },
    background: {
        name: "--lit-tab-background",
        default: "transparent"
    },
    color: {
        name: "--lit-tab-color",
        default: "hsl(264, 100%, 66%)"
    },
    colorDefault: {
        name: "--lit-tab-color-default",
        default: "#666"
    },
    indicator: {
        name: "--lit-tab-indicator",
        default: "hsl(264, 100%, 66%)"
    }

};
export const _vTabs = makeCSSProxy(TabsStyles)
export const tabsCSSVars = makeCSSNameProxy(TabsStyles)