import {TemplateResult} from 'lit'

export type ISourceItem = {
    key: string;
    [key: string]: string | number | Record<string, any>;
}
export type TFilterType = 'checkbox' | 'text' | 'number' | 'date' | 'select';

export interface TFilterItem {
    divider?: boolean,
    title?: string;
    text: string;
    value: string | number | boolean;
    items?: string[];
    checked?: boolean;
    placeholder?: string;
    name?: string
    type?: TFilterType
    onFilter?: (value: string | number | boolean, record: ISourceItem, filters?: Map<string, TFilterItem[]> ) => boolean;
}

interface IFilters extends TFilterItem{
    key: string
}

export type TColumnItem = {
    title: string;
    key: string;
    valueFn?: (data: any) => string | TemplateResult
    filters?: TFilterItem[];
    //onFilter?: (value: string, record: ISourceItem) => boolean;
    sorter?: boolean | ((a: ISourceItem, b: ISourceItem, direction: TSortDirections) => number); 
    sortDirections?: TSortDirections[];
    width?: number
    percent?: number
    defaultSort?: boolean
    align?: string
    ellipses?: boolean
    getStatus?: (data: any) => string
    halfHidden?: (data: any) => boolean
}

export type TRowSelected = (data: any) => boolean;

export type TSortDirections = 'ascend' | 'descend';