
import { TemplateResult, html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/sidebar';


import type { ISidebarProps } from '../src/sidebar/interface';

const toggle = () => {
    const el = document.querySelector(`lit-sidebar`);
    el.opened = !el.opened;
}
const Sidebar = (data: ISidebarProps) => 
    html`<lit-sidebar .opened = "${data.opened}" >
            Sidebar
            <lit-select value = "2">
                <lit-option value = "1">Value 1</lit-option>
                <lit-option value = "2">Value 2</lit-option>
            </lit-select>
        </lit-sidebar>
        <lit-button 
            style = "margin-left: 200px;"
            @click = "${toggle}">Open</lit-button>
        `;


const Template: Story<Partial<ISidebarProps>> = (args) => Sidebar(args as ISidebarProps);

export const Default = Template.bind({});

Default.args = {
    opened: true
}

export default {
    title: 'Other/Sidebar',
    argTypes: {
            
    },
    
} as Meta;
