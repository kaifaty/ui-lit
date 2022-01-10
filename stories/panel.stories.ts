
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../dist/panel';


const panel = ({text, danger}) => 
    html`<lit-panel ?danger = "${danger}">${text}</lit-panel>`;


const Template: Story<Partial<{text: string}>> = (data) => panel(data);

export const Default = Template.bind({});
Default.args = {
    text: 'Panel text',
    danger: false

}
export default {
    title: 'Text/Panel',
    argTypes: {
            
    },
    component: 'lit-panel',
} as Meta;