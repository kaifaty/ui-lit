import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../src/button'
import {ButtonProps } from  '../src/button'

const _Button = (data: ButtonProps) => {
  return html`
  
  <div>
    <lit-button 
      type = "${data.type || 'button'}"
      .primary = "${!!data.primary}"
      .disabled = "${!!data.disabled}"
      .borderless = "${!!data.borderless}"
      .success = "${!!data.success}"
      .danger = "${!!data.danger}"
      .switchOn = "${!!data.switchOn}"
      .notifyOnClick = "${!!data.notifyOnClick}"
      .loading = "${!!data.loading}"
      size = "${data.size || 'medium'}">
    Button
    </lit-button>
  </div>
  `;
};

const Template: any = (args: ButtonProps) => _Button(args);

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  primary: false,
  disabled: false,
  borderless: false,
  success: false,
  danger: false,
  switchOn: false,
  notifyOnClick: false,
  loading: false,
  size: 'medium',
}

export const Borderless = Template.bind({});
Borderless.args = {
  borderless: true
}

export const NotifyOnClick = Template.bind({});
NotifyOnClick.args = {
  notifyOnClick: true
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
}
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
}

export const Success = Template.bind({});
Success.args = {
  success: true
}

export const Danger = Template.bind({});
Danger.args = {
  danger: true
}

export const Switch = Template.bind({});
Switch.args = {
  type: "switch",
  switchOn: true
}


export const Loading = Template.bind({});
Loading.args = {
  loading: true
}



export default {
  title: 'Form assosiated/Button',
  argTypes: {
    onClick: { action: 'onClick' },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'switch'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta;