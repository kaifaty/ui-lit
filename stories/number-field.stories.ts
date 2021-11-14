import { TemplateResult, html } from 'lit';
import '../dist/number';
import type { NumberProps } from '../src/number';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Number = (data: NumberProps) => 
    html`<lit-number 
        .value = "${data.value || ''}"
        .min = "${data.min}"
        .max = "${data.max}"
        .decimals = "${data.decimals}"
        .icon = "${data.icon}"
        placeholder = "${data.placeholder}"
        ?autofocus = "${data.autofocus}"
        ?readonly = "${data.readonly}"
        ?useCancelButton = "${data.useCancelButton}"
        ?replaceToRange = "${data.replaceToRange}"
        inputmode = "${data.inputmode}"
    ></lit-number>`;


const Template: Story<Partial<NumberProps>> = (args) => Number(args as NumberProps);

export const Default = Template.bind({});

Default.args = {
    value: '4',
    placeholder: '',
    inputmode: 'text',
    icon: 'USDT',
    decimals: 8,
    min: 1,
    max: 1000,
    readonly: false,
    autofocus: false,
    useCancelButton: false,
    replaceToRange: false,
    required: false,
}

export default {
    title: 'Form assosiated/Number field',
    argTypes: {
        inputmode: {
          options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
          control: { type: 'select' }
        }
    },
    parameters: {
        actions: {
            handles: ['changed', 'fromAttached', 'fromDettached', 'submitForm'],
        }
    }
} as Meta;