
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/tabs';
import { ITabs } from '../src/tabs';


const Tabs = (data: ITabs) => 
    html`<tabs-element 
        selected = "${data.value}"
        type = "${data.type}"
        ?disabled = "${data.disabled}">
        <tab-item value = "1">Tab 1</tab-item>
        <tab-item value = "2">Tab 2</tab-item>
        <tab-item value = "3">Tab 3</tab-item>
    </tabs-element>`;

const Template: Story<Partial<ITabs>> = (args) => Tabs(args as ITabs);

export const Default = Template.bind({});
Default.args = {
    value: '1',
    type:  'button',
    disabled:  false
}
export default {
    title: 'Form Assosiated/Tabs',
    argTypes: {
        type: {
          options: ['button', 'tab'],
          control: { type: 'radio' }
        }
    },
    parameters: {
        actions: {
            handles: ['changed', ],
        }
    }
    
} as Meta;