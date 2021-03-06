import { ifDefined } from 'lit/directives/if-defined';

import '../src/link';
import type { ILinkProps } from '../src/link/interface';
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';


const Link = (data: ILinkProps) => 
    html`<lit-link 
        .underlined = "${data.underlined}"
        .rel = "${data.rel}"
        .target = "${data.target}"
        .href = "${data.href ? data.href : undefined}"
    >Link Element</lit-link>`;


const Template: Story<Partial<ILinkProps>> = (args) => Link(args as ILinkProps);

export const Default = Template.bind({});
Default.args = {
    href: '/',
    rel: '',
    target: '_blank',
    underlined: false,
}
export default {
    title: 'Text/Link Element',
    
} as Meta;