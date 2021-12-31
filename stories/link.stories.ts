import { ifDefined } from 'lit/directives/if-defined';

import '../dist/link';
import type { ILinkProps } from '../link';
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';


const Link = (data: ILinkProps) => 
    html`<lit-link 
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
}
export default {
    title: 'Text/Link Element',
    
} as Meta;