import { TemplateResult, html } from 'lit-html';
import '../src/textarea';
import type { ITextareaProps } from '../src/textarea';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Text = (data: ITextareaProps) => 
    html`<lit-textarea 
        .disabled = "${data.disabled}"
        value = "${data.value}"
        name = "${data.name}"
        placeholder = "${data.placeholder}"
    ></lit-textarea>`;


const Template: Story<Partial<ITextareaProps>> = (args) => Text(args as ITextareaProps);

export const Default = Template.bind({});

Default.args = {
    value: '',
    name: 'area',
    placeholder: 'Type text',
    disabled: false

}

export default {
    title: 'Form assosiated/Textarea field',
    argTypes: {
    },
    parameters: {
        actions: {
            handles: ['changed', 'fromAttached', 'fromDettached', 'submitForm', ],
        }
    }
} as Meta;