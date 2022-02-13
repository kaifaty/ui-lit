
import { TemplateResult, html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/menu';


import type { IPropsSelect } from '../src/select/interface';

const Number = () => 
    html`
    <lit-menu label = "Menu">
        <lit-menu-item>1 nu-item nu-item nu-item</lit-menu-item>
        <lit-menu-item>2</lit-menu-item>
    </lit-menu>

    `;


const Template: Story<Partial<IPropsSelect>> = (args) => Number();

export const Default = Template.bind({});
Default.args = {
    disabled:  false,
}
export default {
    title: 'Other/Menu',
    argTypes: {
            
    },
    
} as Meta;
