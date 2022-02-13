
import { TemplateResult, html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/select';


import type { IPropsSelect } from '../src/select/interface';

const Number = (data: IPropsSelect) => 
    html`
    <lit-select 
        style = "width: 220px;"  
        value = "2" 
        .disabled = "${data.disabled}"
        .readonly = "${data.readonly}"
        .multiple = "${data.multiple}"
        .searchable = "${data.searchable}">
        <lit-opt-group>
            <lit-option value = "1">test 1</lit-option>
            <lit-option value = "2">test 2</lit-option>
            <lit-option value = "3">test 3</lit-option>
        </lit-opt-group>
        <lit-opt-group>
            <lit-option value = "15">group 2 - 1</lit-option>
            <lit-option value = "16">group 2 - 2</lit-option>
            <lit-option value = "17">group 2 - 3</lit-option>
        </lit-opt-group>
    </lit-select>

    `;


const Template: Story<Partial<IPropsSelect>> = (args) => Number(args as IPropsSelect);

export const Default = Template.bind({});
Default.args = {
    value: '1',
    disabled:  false,
    readonly:  false,
    searchable:  false,
    multiple:  false,
}
export default {
    title: 'Form Assosiated/Select',
    argTypes: {
            
    },
    
} as Meta;
