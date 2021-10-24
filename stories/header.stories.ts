

import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/header';
import { IHeaderProps } from '../src/header';

 
const Header = (data: IHeaderProps) => 
    html`<header-element level = "${data.level}">Header of ${data.level} level</header-element>`;


const Template: Story<Partial<IHeaderProps>> = (data) => Header(data as IHeaderProps);

export const Default = Template.bind({});
Default.args = {
    level: 1,
}
export default {
    title: 'Text/Header',
    argTypes: {
        level: {
            options: [1, 2, 3, 4, 5, 6],
            control: { type: 'radio' }
        }
    },
    component: 'header-element',
} as Meta;