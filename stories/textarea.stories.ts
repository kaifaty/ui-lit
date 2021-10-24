import { TemplateResult, html } from 'lit';
import '../dist/textarea';
import type { ITextareaProps } from '../src/textarea';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Text = (data: ITextareaProps) => 
    html`<textarea-field 
        value = "${data.value}"
        name = "${data.name}"
        placeholder = "${data.placeholder}"
    ></textarea-field>`;


const Template: Story<Partial<ITextareaProps>> = (args) => Text(args as ITextareaProps);

export const Default = Template.bind({});

Default.args = {
    value: '',
    name: 'area',
    placeholder: 'Type text',

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