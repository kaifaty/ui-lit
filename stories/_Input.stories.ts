import { TemplateResult, html } from 'lit';
import '../dist/text-field';
import { TextProps } from '../src/text-field';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

interface IProps extends TextProps{    
    label: string | TemplateResult
}
const Text = (data: IProps) => 
    html`<text-field 
        .value = "${data.value || ''}"
        placeholder = "${data.placeholder}"
        ?autofocus = "${data.autofocus}"
        ?readonly = "${data.readonly}"
        ?spellcheck = "${data.spellcheck}"
        ?useCancelButton = "${data.useCancelButton}"
        inputmode = "${data.inputmode}"
        type = "${data.type}"
        size = "${data.size}"
    >${data.label}</text-field>`;


const Template: Story<Partial<IProps>> = (args) => Text(args as IProps);

export const Default = Template.bind({});

Default.args = {
    value: '',
    placeholder: 'placeholder',
}

export const CancalableIcon = Template.bind({});
CancalableIcon.args = {
    value: 'text',
    useCancelButton: true,
}

export default {
    title: 'UI kit/TextField',
} as Meta;