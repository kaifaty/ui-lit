
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/list';


const panel = (text: string) => 
    html`<list-element>
        <list-item>List item 1</list-item>
        <list-item>List item 2</list-item>
        <list-item>List item 3</list-item>
    </list-element>`;


const Template: Story<Partial<{text: string}>> = (data) => panel(data.text);

export const Default = Template.bind({});
Default.args = {
}
export default {
    title: 'Text/List',
    argTypes: {
            
    },
    component: 'list-element',
} as Meta;