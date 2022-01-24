import { makeCSSNameProxy } from './../helpers/cssproxy';
import { makeCSSProxy } from '../helpers/cssproxy';

export const TabsStyles = {
    outline: {
        name: "outline-focus",
        default: "1px dashed #999"
    },
    height: {
        name: "height",
        default: "30px"
    },
    background: {
        name: "background",
        default: "transparent"
    },
    color: {
        name: "color",
        default: "hsl(264, 100%, 66%)"
    },
    colorDefault: {
        name: "color-default",
        default: "#666"
    },
    indicator: {
        name: "indicator",
        default: "hsl(264, 100%, 66%)"
    }

};
export const _vTabs = makeCSSProxy(TabsStyles, "--lit-tab-")
export const tabsCSSVars = makeCSSNameProxy(TabsStyles, "--lit-tab-")