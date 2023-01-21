import {css} from 'lit'
export const noselect = css`
:host, .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
`

export const noselectText = `
-webkit-touch-callout: none;
    -webkit-user-select: none; 
     -khtml-user-select: none;
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none;
`
