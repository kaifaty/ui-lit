import '../dist/dialog';
import '../dist/tooltip';
import '../dist/range';
import '../dist/header';
import type { IDialogProps } from '../src/dialog';
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';


const open = () => {
    document.querySelector("lit-dialog").open();
}
const Link = (data: IDialogProps) => 
    html`
    <lit-button @click = "${open}">Open</lit-button>
    <lit-dialog 
        ?useCancelBtn = "${data.useCancelBtn}">
            <lit-range></lit-range>
            <br/>
            <lit-tooltip>
                <lit-icon icon = "help">></lit-icon>
                <div slot = "tooltip">
                    Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip 
                </div>
            </lit-tooltip>
            <lit-header level = "5">Confirm otp please</lit-header>
        <lit-header level = "2" slot = "header">Header</lit-header>
        <lit-button slot = "footer" primary confirm>Confirm</lit-button>
    </lit-dialog>`;


const Template: Story<Partial<IDialogProps>> = (args) => Link(args as IDialogProps);

export const Default = Template.bind({});
Default.args = {
    opened: true,
    useCancelBtn: true,
}
export default {
    title: 'Other/Dialog Element',
    
} as Meta;