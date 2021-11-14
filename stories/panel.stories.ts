
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/panel';


const panel = (text: string) => 
    html`<lit-panel >${text}</lit-panel>`;


const Template: Story<Partial<{text: string}>> = (data) => panel(data.text);

export const Default = Template.bind({});
Default.args = {
    text: 'Panel text'
}
export default {
    title: 'Text/Panel',
    argTypes: {
            
    },
    component: 'lit-panel',
} as Meta;