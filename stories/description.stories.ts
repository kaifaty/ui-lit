
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/description';


const Layaout = () => 
    html`<div>
        <h3>Header 3</h3>
        <lit-description>Some description</lit-description>
    </div>`;


const Template: Story<Partial<{text: string}>> = (data) => Layaout();

export const Default = Template.bind({});
Default.args = {
}
export default {
    title: 'Text/Description',
    argTypes: {
        
    },
    component: 'description-element',
} as Meta;