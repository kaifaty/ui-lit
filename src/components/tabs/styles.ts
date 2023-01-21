
import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'




export const TabsStyles = {
    outline: {
        name: 'outline-focus',
        default: '1px dashed #999'
    },
    height: {
        name: 'height',
        default: '30px'
    },
    background: {
        name: 'background',
        default: 'transparent'
    },
    backgroundHover: {
        name: 'background-hover',
        default: 'transparent'
    },
    ripple: {
        name: 'ripple',
        default: 'transparent'
    },
    color: {
        name: 'color',
        default: 'hsl(264, 100%, 66%)'
    },
    colorDefault: {
        name: 'color-default',
        default: '#666'
    },
    indicator: {
        name: 'indicator',
        default: 'hsl(264, 100%, 66%)'
    }

}
export const _v = makeCSSProxy(TabsStyles, '--lit-tab-')
export const tabsCSSVarNames = makeCSSNameProxy(TabsStyles, '--lit-tab-')
