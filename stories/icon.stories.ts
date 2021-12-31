
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/icon';
import type { IIconProps } from '../icon';


const Icon = (data: IIconProps) => 
    html`<lit-icon 
        .icon = "${data.icon}"
    ></lit-icon>`;


const Template: Story<Partial<IIconProps>> = (args) => Icon(args as IIconProps);

export const Default = Template.bind({});
Default.args = {
    icon: 'dropdown',
}
export default {
    title: 'Other/Icon',
    argTypes: {
            
    },
    component: 'lit-icon',
} as Meta;