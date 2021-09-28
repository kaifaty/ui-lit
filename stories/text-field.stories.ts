import { TemplateResult, html } from 'lit';
import '../dist/text-field';
import type { TextProps } from '../src/text-field';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Text = (data: TextProps) => 
    html`<text-field 
        .value = "${data.value || ''}"
        .minlength = "${data.minlength}"
        .maxlength = "${data.maxlength}"
        placeholder = "${data.placeholder}"
        ?autofocus = "${data.autofocus}"
        ?disabled = "${data.disabled}"
        ?required = "${data.required}"
        ?readonly = "${data.readonly}"
        ?spellcheck = "${data.spellcheck}"
        ?useCancelButton = "${data.useCancelButton}"
        inputmode = "${data.inputmode}"
        pattern = "${data.pattern}"
        icon = "${data.icon}"
        type = "${data.type}"
        size = "${data.size}"
    ></text-field>`;


const Template: Story<Partial<TextProps>> = (args) => Text(args as TextProps);

export const Default = Template.bind({});

Default.args = {
    value: 'test',
    pattern: '',
    type: 'text',
    icon: '',
    inputmode: 'text',
    placeholder: 'placeholder',
    size: 0,
    minlength: 5,
    maxlength: 10,
    useCancelButton: false,
    disabled: false,
    autofocus: false,
    spellcheck: false,
    required: false,
    readonly: false,
}

export const Password = Template.bind({});
Password.args = {
    minlength: 8,
    value: "password",
    type: 'password'
}

export default {
    title: 'Form assosiated/Text field',
    argTypes: {
        type: {
          options: ['text', 'password'],
          control: { type: 'select' }
        },
        inputmode: {
          options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
          control: { type: 'select' }
        }
    },
    parameters: {
        actions: {
            handles: ['changed', 'fromAttached', 'fromDettached', 'submitForm', ],
        }
    }
} as Meta;