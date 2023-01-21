import {createcssMap} from '@kai/utils'
import {css} from 'lit'


export const PREFIX = '--lit-tree-'

const {getVar, getKey} = createcssMap({
  'item-color': 'hsl(306, 65%, 98%)',
  'item-color-selected': 'hsl(306, 65%, 80%)',
  'item-background-color-selected': 'hsl(306, 30%, 15%)',
  'item-background-color-hover': 'hsl(306, 30%, 17%)',
} , PREFIX)

export const treeViewVarNames = getKey

export const treeItemStyles = css`:host{
  display: block;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.5rem;
  color: ${getVar('item-color')};
  padding: 6px 12px;
  
}
:host([href='']){
  padding: 8px 16px;
}
:host(:hover){
  background-color: ${getVar('item-background-color-hover')};
}
:host([selected]){
  background-color: ${getVar('item-background-color-selected')};
  color: ${getVar('item-color-selected')};
}
a{
  text-decoration: none;
  padding: 6px 12px;
  display: block;
  color: inherit;
}`