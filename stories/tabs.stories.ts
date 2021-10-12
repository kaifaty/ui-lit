
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/tabs';
import { ITabs } from '../src/tabs';


const Select = (data: ITabs) => 
    html`<tabs-element 
        .value = "${data.value}"
        .items = "${data.items}"
        .type = "${data.type}"
        .disabled = "${data.disabled}"
    ></tabs-element>`;

const Template: Story<Partial<ITabs>> = (args) => Select(args as ITabs);

export const Default = Template.bind({});
Default.args = {
    value: '1',
    type:  'button',
    disabled:  false,
    items: [
        {value: '1', text: 'Tab 1'},
        {value: '2', text: 'Tab 2'},
        {value: '3', text: 'Tab 3'},
    ]
}
export default {
    title: 'Form Assosiated/Tabs',
    argTypes: {
        type: {
          options: ['button', 'tab'],
          control: { type: 'radio' }
        }
    },
    
} as Meta;