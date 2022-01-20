
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../dist/tabs';
import { ITabs } from '../src/tabs';


const Tabs = (data: ITabs) => 
    html`<lit-tabs 
            value = "${data.value}"
            type = "${data.type || 'button'}"
            ?disabled = "${data.disabled}">
        <lit-tab value = "1">Tab 1</lit-tab>
        <lit-tab value = "2">Tab looong 2</lit-tab>
        <lit-tab value = "3">Tab 3</lit-tab>
    </lit-tabs>`;

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