
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/select';
import type { IPropsSelect } from '../src/select';


const Select = (data: IPropsSelect) => 
    html`<select-element 
        .value = "${data.value}"
        .items = "${data.items}"
        .disabled = "${data.disabled}"
        .optionsWidth = "${data.optionsWidth}"
        .optionsHeight = "${data.optionsHeight}"
    ></select-element>`;

const Template: Story<Partial<IPropsSelect>> = (args) => Select(args as IPropsSelect);

export const Default = Template.bind({});
Default.args = {
    value: '1',
    disabled:  false,
    readonly:  false,
    optionsWidth:  0,
    optionsHeight:  0,
    items: [
        {value: '1', text: 'Text 1'},
        {value: '2', text: 'Text 2'},
        {value: '3', text: 'Text 3'},
        {value: '4', text: 'Text 4'},
        {value: '5', text: 'Text 5'},
        {value: '6', text: 'Text 6'},
        {value: '7', text: 'Text 7'},
    ]
}
export default {
    title: 'Form Assosiated/Select',
    argTypes: {
            
    },
    
} as Meta;