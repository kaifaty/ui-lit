import {getScrollbarWidth} from '@kai/utils'

/**
 * Turn off/on body overflow
 * Set compensation padding
 * @param visible Visabilitry of dialog
 */
const bodyOverflow = document.body.style.overflow
const bodyPaddingRight = document.body.style.paddingRight

export const setScrollbarPadding = (visible: boolean) => {
    if(visible){
        document.body.style.paddingRight = getScrollbarWidth() + 'px'
        document.body.style.overflow = 'hidden'     
    }
    else{
        document.body.style.paddingRight = bodyPaddingRight
        document.body.style.overflow = bodyOverflow
    }
}

/**
 * Trap for dialog
 * 
 * @param visible Visabilitry of dialog
 */
export const changeInert = (visible: boolean) => {
  for(const el of document.body.children){
      if(el instanceof HTMLElement && 
          el.tagName !== 'SCRIPT' && 
          el.tagName !== 'LIT-DIALOG' 
      ){
          if(visible){
              el.setAttribute('inert', '')
          }
          else{
              el.removeAttribute('inert')
          }
      }
  }
}