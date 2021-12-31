
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/circlepercent';
import { ICircleProps } from '../src/circlepercent';

 
const Circle = (data: ICircleProps) => 
    html`<lit-circle 
            style = "--lit-circle-color: #d11198; --lit-percent-size: 50px;"
            size = "50"
            percent = "${data.percent}"></lit-circle>`;


const Template: any = (data: ICircleProps) => Circle(data);

export const Default = Template.bind({});
Default.args = {
    percent: 88,
}

export default {
    title: 'Text/Circle',
    argTypes: {
        status: {
        }
    },
    component: 'lit-text',
} as Meta;