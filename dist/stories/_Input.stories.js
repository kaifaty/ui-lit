import { html } from 'lit';
import '../dist/text-field';
import './assets/style.css';
const Text = (data) => html `<text-field 
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
const Template = (args) => Text(args);
export const Default = Template.bind({});
Default.args = {
    value: '',
    placeholder: 'placeholder',
};
export const CancalableIcon = Template.bind({});
CancalableIcon.args = {
    value: 'text',
    useCancelButton: true,
};
export default {
    title: 'UI kit/TextField',
};
