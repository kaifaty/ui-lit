import { iconCSSVarNames } from './../icon/styles';
import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';


export const filterWidth = 230;

const tableCSSVars ={
    fontSize: {
        name: "font-size",
        default: "inherit"
    },
    cursor: {
        name: "cursor",
        default: "initial"
    },
    rowHover: {
        name: "row-hover",
        default: "#f5f5f5"
    },
    rowSelected: {
        name: "row-selecte",
        default: "#eee"
    },
    cellPadding: {
        name: "cell-padding",
        default: "0 15px"
    },
    cellHeaderPadding: {
        name: "cell-header-padding",
        default: "0 15px"
    },
    headerSeparator: {
        name: "header-separator",
        default: "rgba(0,0,0,0.2)"
    },
    headerFontSize: {
        name: "font-size",
        default: "inherit"
    },
    headerColor: {
        name: "color",
        default: "inherit"
    },
    headerBackground: {
        name: "background",
        default: "#eee"
    },
    headerIconColor: {
        name: "icon-color",
        default: "rgba(0,0,0,0.2)"
    },
    headerIconColorHover: {
        name: "icon-color-hover",
        default: "rgba(0,0,0,0.8)"
    },
    headerIconColorSelected: {
        name: "icon-color-selected",
        default: "hsl(264, 90%, 60%)"
    },
    headerIconBackgroundHover: {
        name: "icon-background-hover",
        default: "rgba(0,0,0,0.1)"
    },
    headerSortPadding: {
        name: "sort-padding",
        default: "2px 5px"
    },
    headerFilterPadding: {
        name: "filter-padding",
        default: "6px 4px"
    },
    headerFilterContentBackground: {
        name: "filter-content-background",
        default: "#fff"
    },
    headerFilterContentShadow: {
        name: "filter-content-shadow",
        default: "rgba(0,0,0,0.6)"
    }

};
// header-separator, rgba(0,0,0,0.2)
// var(--lit-cell-header-padding, 0 15px)

const _v = makeCSSProxy(tableCSSVars, "--lit-table-");
export const tableCSSVarsNames = makeCSSNameProxy(tableCSSVars, "--lit-table-");

export const tableStyles = css`
:host{
    display: grid;
    --lit-cells: 4;
    --row-height: 30px;
    --header-height: 50px;
    font-size: var(${_v.fontSize});
    position: relative;
}
:host([pagination]){
    display: grid;
    grid-template-rows: auto 26px;
}
:host(:not([pagination])) footer{
    display: none;
}

table{
    border-collapse: collapse;
    width: 100%;
}
table.nodata {
    height: 100%;
}
table.nodata td{
    height: auto;
}
tbody td{
    padding: ${_v.cellPadding};
    height: var(--row-height);
    white-space: nowrap;
}
tbody td.ellipses{
    max-width: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
tbody td.half-hidden{
    opacity: 0.5;
}
th{
    height: var(--header-height, 35px);
    padding: 0;
    color: ${_v.headerColor};
}


th:not(:last-child) lit-table-header::after{
    content: '';
    position: absolute;
    width: 1px;
    height: 50%;
    display: inline-block;
    background-color: ${_v.headerSeparator};
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
}
tbody tr{
    cursor: ${_v.cursor};
}
tbody tr:hover{
    background-color: ${_v.rowHover};
}
tbody tr.selected{
    background-color: ${_v.rowSelected};
}
main{
    overflow-y: auto;
}
.nodata svg{
    fill: var(${iconCSSVarNames.color});
    opacity: 0.1;
}
lit-pagination{
    display: flex;
    align-content: end;
}
footer{
    display: flex;
    justify-content: space-between;
}
.ellipses.col-wrapper{
    display: flex;
    align-items: center;
    overflow:hidden;
}
.ellipses.col-wrapper > *{
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
}
`

export const tableHeaderStyles = css`
:host{
    padding: var(${tableCSSVarsNames.cellHeaderPadding}, ${_v.cellPadding});
    font-weight: 600;
    font-size: ${_v.headerFontSize};
    ${iconCSSVarNames.fontSize}: 8px;
    ${iconCSSVarNames.color}: ${_v.headerIconColor};
    background-color: ${_v.headerBackground};
    position: relative;
    display: flex;
    height: 100%;
}

.sort-icons{
    display: flex;
    padding: ${_v.headerSortPadding};
    flex-direction: column;
    align-items: center;
    line-height: 0.9;
    margin-left: 4px;
}
:host([sortDirection = "descend"]) .sorted lit-icon[icon = "dropdown"],
:host([sortDirection = "ascend"]) .sorted lit-icon[icon = "dropup"],
.filters-checked{
    ${iconCSSVarNames.color}: ${_v.headerIconColorSelected};
}
[icon = "filter"]{
    padding: ${_v.headerFilterPadding};
    border-radius: 3px;
}
.sort-icons[hover],
[icon = "filter"][hover]{
    background-color: ${_v.headerIconBackgroundHover};
    ${iconCSSVarNames.color}: ${_v.headerIconColorHover};
    
}
.sorter{
    cursor: pointer;
}
.wrapper{
    display: flex;
    align-items: center;
}
.filter-template{
    position: absolute;
    font-size: 12px;
    top: 1px;
    left: 1px;
    font-weight: 400;
    padding: 10px;
    width: ${filterWidth}px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: ${_v.headerFilterContentBackground};
    box-shadow: 0 0 6px ${_v.headerFilterContentShadow};
    z-index: 3;
    contain: content;
    display: grid;
    grid-template-rows: auto 25px;
    gap: 10px;
    
}
:host([right]) .filter-template{
    right: 1px;
    left: initial;
}
.filter-template footer{
    display: flex;
    justify-content: space-between;

}
.filter-template checkbox-element{
    margin-right: 7px;
}
lit-label{
    flex-direction: column;
    align-items: start;
    text-align: left;
}
.flex-center{
    display: flex;
    align-items: center;
}
.rows{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;
}
.row{
    display: contents;
}
:host([align = center]){
    justify-content: center;
}
:host([align = right]){
    justify-content: right;
}
`