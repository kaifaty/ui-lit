import { TemplateResult, html } from 'lit-html';
import '../src/checkbox';
import type { ICheckboxProps } from '../src/checkbox';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Number = (data: ICheckboxProps) => 
    html`<lit-label>
        Label for: 
        <lit-checkbox 
            ?checked = "${data.checked}"
            ?readonly = "${data.readonly}"
            .value = "${data.value}"
            type = "${data.type || 'switcher'}"
        ></lit-checkbox>
    </lit-label>
    `;


const Template: Story<Partial<ICheckboxProps>> = (args) => Number(args as ICheckboxProps);

export const Switcher = Template.bind({});
Switcher.args = {
    type: 'switcher',
}
export const Checkbox = Template.bind({});
Checkbox.args = {
    type: 'checkbox',
}

export default {
    title: 'Form assosiated/Checkbox',
    
    argTypes: {
        value: {
            options: ['on', 'off'],
            control: { type: 'select' }
        },
        type: {
            options: ['switcher', 'checkbox'],
            control: { type: 'select' }
        },
    },
    parameters: {
        actions: {
            handles: ['changed', 'fromAttached', 'fromDettached', 'submitForm'],
        }
    }
} as Meta;