

import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/spinner';
import { ISipnnerProps } from '../dist/spinner/index';


const Layaout = (data: ISipnnerProps) => 
    html`<div style = "width: 600px; height: 600px; border: 1px dashed red;">
        <lit-spinner 
            ?big = "${data.big}"
            ?small = "${data.small}"
            ?fullContent = "${data.fullContent}"
            ?fullscreen = "${data.fullscreen}"
        ></lit-spinner>
    </div>`;


const Template: Story<Partial<ISipnnerProps>> = (data) => Layaout(data as ISipnnerProps);

export const Default = Template.bind({});
Default.args = {
    fullscreen: false,
    fullContent: false,
    small: false,
    big: false,
}
export default {
    title: 'Other/Spinner',
    argTypes: {
            
    },
    component: 'lit-spinner',
} as Meta;