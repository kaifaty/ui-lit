
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/circlepercent';
import { ICircleProps } from '../src/circlepercent';

 
const Circle = (data: ICircleProps) => 
    html`<circle-percent 
            style = "--circle-color: #d11198;"
            size = "77" 
            percent = "${data.percent}"></circle-percent>`;


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
    component: 'text-element',
} as Meta;