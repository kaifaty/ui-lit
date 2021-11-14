
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/circlepercent';
import { ICircleProps } from '../src/circlepercent';

 
const Circle = (data: ICircleProps) => 
    html`<lit-circle 
            style = "--circle-color: #d11198;"
            size = "77" 
            percent = "${data.percent}"></lit-circle>`;


const Template: Story<Partial<ICircleProps>> = (data) => 
    Circle(data as ICircleProps);

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