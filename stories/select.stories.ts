
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/select';
import type { IPropsSelect } from '../src/select';


const Select = (data: IPropsSelect) => 
    html`
    <div>
        <select-element 
            .value = "${data.value}"
            .disabled = "${data.disabled}"
            .optionsWidth = "${data.optionsWidth}"
            .optionsHeight = "${data.optionsHeight}">
            <select-item value = "1">Item 1</select-item>
            <select-item value = "2">Item 2</select-item>
            <select-item value = "3">Item 3</select-item>
            <select-item value = "4">Item 4</select-item>
            <select-item value = "5">Item 5</select-item>
        </select-element>
    </div>
    `;

const Template: Story<Partial<IPropsSelect>> = (args) => Select(args as IPropsSelect);

export const Default = Template.bind({});
Default.args = {
    value: '1',
    disabled:  false,
    readonly:  false,
    optionsWidth:  0,
    optionsHeight:  0,
}
export default {
    title: 'Form Assosiated/Select',
    argTypes: {
            
    },
    
} as Meta;