import { TemplateResult, html } from 'lit-html';
import '../dist/form';
import type { IFormProps } from '../src/form';
import { Story, Meta } from '@storybook/web-components';

const success = () => alert('submit');
const Button = (data: IFormProps) => 
    html`<lit-form 
        @submit = "${success}"
        style = "width: 350px; display: grid; gap: 20px; grid-template-columns: 1fr 1fr; align-items: center;"
        ?disabled = "${data.disabled}"
        ?noValidate = "${data.noValidate}">
            <label-element for = "name">Name:</label-element> 
            <lit-textfield id = "name" value = "Mike"></lit-textfield>

            <label-element for = "salary">Salary:</label-element> 
            <lit-numberfield id = "salary" decimals = "2" icon = "USDT" min = "500" ?required = "${true}"></lit-numberfield>
            
            <label-element >Required:</label-element> 
            <lit-numberfield required ></lit-numberfield>
            
            <label-element for = "live">Is Alive</label-element>
            <lit-checkbox id = "live"></lit-checkbox>
            <div style = "grid-column: 1/3; display: flex; justify-content: center;">
                <lit-button primary type = "submit">Submit</lit-button>
            </div>
    </lit-form>
    <form @submit = "${e => e.preventDefault()}">
        
        <label-element for = "name">Name:</label-element> 
        <input minlength = "4" type = "text" >
        <button type = "submit">Submit</button>
    </form>
    
    `;


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