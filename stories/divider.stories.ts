
import '../dist/divider';
import type { IDividerProps } from '../src/divider';
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';


const Link = (data: IDividerProps) => 
    html`<lit-divider></lit-divider>`;


const Template: Story<Partial<IDividerProps>> = (args) => Link(args as IDividerProps);

export const Default = Template.bind({});
Default.args = {
    
}
export default {
    title: 'Text/Divider',
    
} as Meta;