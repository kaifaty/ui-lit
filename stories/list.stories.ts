
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/list';


const panel = (text: string) => 
    html`<lit-list>
        <lit-list-item>List item 1</lit-list-item>
        <lit-list-item>List item 2</lit-list-item>
        <lit-list-item>List item 3</lit-list-item>
    </lit-list>`;


const Template: Story<Partial<{text: string}>> = (data) => panel(data.text);

export const Default = Template.bind({});
Default.args = {
}
export default {
    title: 'Text/List',
    argTypes: {
            
    },
    component: 'lit-list',
} as Meta;