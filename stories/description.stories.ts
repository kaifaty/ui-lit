
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/description';


const Layaout = () => 
    html`<div>
        <h3>Header 3</h3>
        <description-element>Some description</description-element>
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