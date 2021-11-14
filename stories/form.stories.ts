import { TemplateResult, html } from 'lit';
import '../dist/form';
import type { IFormProps } from '../src/form';
import { Story, Meta } from '@storybook/web-components';

const Button = (data: IFormProps) => 
    html`<lit-form 
        style = "width: 350px; display: grid; gap: 10px; grid-template-columns: auto auto;"
        ?disabled = "${data.disabled}"
        ?noValidate = "${data.noValidate}">
            <label-element for = "name">Name:</label-element> 
            <lit-textfield id = "name" value = "Mike"></lit-textfield>

            <label-element for = "salary">Salary:</label-element> 
            <lit-numberfield id = "salary" decimals = "2" icon = "USDT" min = "500" ?required = "${true}"></lit-numberfield>
            
            <label-element for = "live"></label-element>
            <input type = "checkbox">
            <div style = "grid-column: 1/3;">
                <lit-button type = "submit">Submit</lit-button>
            </div>
    </lit-form>`;


const Template: Story<Partial<IFormProps>> = (args) => Button(args as IFormProps);

export const Form = Template.bind({});
Form.args = {
    disabled: false,
    noValidate: false,
}
export default {
    title: 'Form assosiated/Form',
    parameters: {
        actions: {
            handles: ['submit'],
        }
    }
} as Meta;