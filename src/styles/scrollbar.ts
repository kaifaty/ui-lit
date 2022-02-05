import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

export const scrollbarCSSVars = {
  track: {
      name: "track",
      default: "#f1f1f1"
  },
  thumb: {
      name: "thumb",
      default: "#333"
  },

};
export const _v = makeCSSProxy(scrollbarCSSVars, "--lit-scroll-")
export const scrollbarCSSVarNames = makeCSSNameProxy(scrollbarCSSVars, "--lit-scroll-")

export const scrollbar = css`
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: ${_v.track};
}
::-webkit-scrollbar-thumb {
  background: ${_v.thumb};
}
:host, .ff-scrollbar{  
  scrollbar-color: ${_v.thumb} ${_v.track};
  scrollbar-width: thin;
}
`;