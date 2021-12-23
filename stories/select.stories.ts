
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/select';
import type { IPropsSelect } from '../src/select';


const Select = (data: IPropsSelect) => 
    html`
    <div>
        <lit-select 
            .items = "${data.items}"
            .value = "${data.value}"
            .disabled = "${data.disabled}"
            .optionsWidth = "${data.optionsWidth}"
            .optionsHeight = "${data.optionsHeight}">
        </lit-select>
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
    items: [...Array(5)].map((it, i) => ({value: i, content: `Item ${i}`}))
}
export default {
    title: 'Form Assosiated/Select',
    argTypes: {
            
    },
    
} as Meta;