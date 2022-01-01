import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../dist/button'
import {ButtonProps } from  '../src/button'

const _Button = (data: ButtonProps) => {
  return html`<lit-button 
    type = "${data.type || 'button'}"
    ?primary = "${!!data.primary}"
    ?disabled = "${!!data.disabled}"
    ?borderless = "${!!data.borderless}"
    ?switch = "${!!data.switch}"
    ?success = "${!!data.success}"
    ?danger = "${!!data.danger}"
    ?switchOn = "${!!data.switchOn}"
    ?notifyOnClick = "${!!data.notifyOnClick}"
    ?loading = "${!!data.loading}"
    size = "${data.size || 'medium'}">
  <lit-icon icon = "account" slot = "icon-before"></lit-icon>
  Button
  </lit-button>
  `;
};

const Template: any = (args: ButtonProps) => _Button(args);

export const Default = Template.bind({});
Default.args = {
}
export const Primary = Template.bind({});
Primary.args = {
  primary: true
}
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
}

export const Success = Template.bind({});
Success.args = {
  success: true
}

export const Borderless = Template.bind({});
Borderless.args = {
  borderless: true
}

export const Danger = Template.bind({});
Danger.args = {
  danger: true
}

export const Center = Template.bind({});
Center.args = {
  center: true
}

export const Loading = Template.bind({});
Loading.args = {
  loading: true
}
export const NotifyOnClick = Template.bind({});
NotifyOnClick.args = {
  notifyOnClick: true
}


export default {
  title: 'Form assosiated/Button',
  argTypes: {
    onClick: { action: 'onClick' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta;