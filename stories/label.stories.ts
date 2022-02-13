import { TemplateResult, html } from 'lit-html';
import '../src/checkbox';
import type { ICheckboxProps } from '../src/checkbox';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css'

const Number = (data: ICheckboxProps) => 
    html`<lit-label>
        Label for: 
        <lit-checkbox 
            ?disabled = "${data.disabled}"
            ?checked = "${data.checked}"
            ?readonly = "${data.readonly}"
            .value = "${data.value}"
            type = "${data.type || 'switcher'}"
        ></lit-checkbox>
    </lit-label>
    `;


const Template: Story<Partial<ICheckboxProps>> = (args) => Number(args as ICheckboxProps);

export const Default = Template.bind({});
Default.args = {
    type: 'switcher',
    disabled: false,
}

export default {
    title: 'Text/Label',
    
    argTypes: {
    },
    parameters: {
        actions: {
            handles: ['changed', 'fromAttached', 'fromDettached', 'submitForm'],
        }
    }
} as Meta;