

import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/text';
import { ITextProps } from '../src/text';

 
const Text = (data: ITextProps) => 
    html`<text-element 
        status = "${data.status}"
        ?center = "${data.center}"
        ?pulse = "${data.pulse}"
    >Some text</text-element>`;


const Template: Story<Partial<ITextProps>> = (data) => Text(data as ITextProps);

export const Default = Template.bind({});
Default.args = {
    status: "none",
    center: false,
    pulse: false,
}
export default {
    title: 'Text/Text',
    argTypes: {
        status: {
            options: ["error", "danger", "attention", "success", "accented", "none"],
            control: { type: 'radio' }
        }
    },
    component: 'text-element',
} as Meta;