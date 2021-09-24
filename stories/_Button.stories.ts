import { TemplateResult, html } from 'lit';
import '../dist/button';
import { ButtonProps } from '../src/button';
import { Story, Meta } from '@storybook/web-components';

interface IProps extends ButtonProps{    
    label: string | TemplateResult
}
const Button = (data: IProps) => 
    html`<button-element 
        ?primary = "${!!data.primary}"
        ?disabled = "${!!data.disabled}"
        ?borderless = "${!!data.borderless}"
        ?switch = "${!!data.switch}"
        ?success = "${!!data.success}"
        ?error = "${!!data.error}"
        ?switchOn = "${!!data.switchOn}"
    >${data.label}</button-element>`;


const Template: Story<Partial<IProps>> = (args) => Button(args as IProps);

export const Default = Template.bind({});
Default.args = {
    label: 'Button',
    primary: false,
    disabled: false,
    borderless: false,
    switch: false,
    success: false,
    error: false,
    switchOn: false,
}
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled',
    disabled: true
}

export const Borderless = Template.bind({});
Borderless.args = {
    label: 'Borderless',
    borderless: true
}

export const Switch = Template.bind({});
Switch.args = {
    label: 'Switch',
    switch: true
}


export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    primary: true
}
export const Success = Template.bind({});
Success.args = {
    label: 'Success',
    success: true
}
export const Error_ = Template.bind({});
Error_.args = {
    label: 'Error',
    error: true
}
export default {
    title: 'UI kit/Button',
} as Meta;