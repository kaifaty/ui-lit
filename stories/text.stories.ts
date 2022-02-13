

import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/text';
import { ITextProps } from '../src/text';

 
const Text = (data: ITextProps) => 
    html`<lit-text 
        status = "${data.status}"
        ?center = "${data.center}"
        ?pulse = "${data.pulse}"
    >Some text</lit-text>`;


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
    component: 'lit-text',
} as Meta;