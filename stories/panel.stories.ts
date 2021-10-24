
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/panel';


const panel = (text: string) => 
    html`<panel-element >${text}</panel-element>`;


const Template: Story<Partial<{text: string}>> = (data) => panel(data.text);

export const Default = Template.bind({});
Default.args = {
    text: 'Panel text'
}
export default {
    title: 'Text/Panel',
    argTypes: {
            
    },
    component: 'panel-element',
} as Meta;