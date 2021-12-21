import { TemplateResult, html } from 'lit';
import '../dist/button';
import { ButtonProps } from '../src/button';
import { Story, Meta } from '@storybook/web-components';

interface IProps extends ButtonProps{    
    label: string | TemplateResult
}
const Button = (data: IProps) => 
    html`<lit-button 
            type = "${data.type}"
            ?primary = "${!!data.primary}"
            ?disabled = "${!!data.disabled}"
            ?borderless = "${!!data.borderless}"
            ?switch = "${!!data.switch}"
            ?success = "${!!data.success}"
            ?danger = "${!!data.danger}"
            ?switchOn = "${!!data.switchOn}"
            ?notifyOnClick = "${!!data.notifyOnClick}"
            ?loading = "${!!data.loading}"
            size = "${data.size}"
        >
        <lit-icon icon = "account" slot = "icon-after"></lit-icon>
        ${data.label}
        <lit-icon icon = "edit" slot = "icon-before"></lit-icon>
    </lit-button>`;


const Template: Story<Partial<IProps>> = (args) => Button(args as IProps);

export const Default = Template.bind({});
Default.args = {
    label: 'Button',
    primary: false,
    disabled: false,
    borderless: false,
    switch: false,
    success: false,
    danger: false,
    switchOn: false,
    notifyOnClick: false,
    loading: false,
    type: 'button',
    size: 'medium',
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
export const Danger = Template.bind({});
Danger.args = {
    label: 'Danger',
    danger: true
}
export const Loading = Template.bind({});
Loading.args = {
    label: 'Loading',
    loading: true
}
export default {
    title: 'Form assosiated/Button',
    component: 'lit-button',
    argTypes: {
        type: {
          options: ['button', 'submit'],
          control: { type: 'radio' }
        },
        size: {
          options: ['small', 'medium', 'large'],
          control: { type: 'radio' }
        }
    },
    parameters: {
        actions: {
            handles: ['submitForm', 'switchChanged'],
        }
    }
} as Meta;