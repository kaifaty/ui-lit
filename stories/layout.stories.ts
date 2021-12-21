
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/layout';
import { ILayoutElementProps } from '../src/layout/grid';


const Layaout = (data: ILayoutElementProps) => 
    html`<lit-layout-grid style = "height: 800px;">
        <lit-layout 
            .top = "${data.top}"
            .left = "${data.left}"
            .width = "${data.width}"
            .minWidth = "${data.minWidth}"
            .maxWidth = "${data.maxWidth}"
            .height = "${data.height}"
            .minHeight = "${data.minHeight}"
            .maxHeight = "${data.maxHeight}"
            .zIndex = "${data.zIndex}"
            name = "test">Layout element</lit-layout>
        <lit-layout 
            .top = "${200}"
            .left = "${700}"
            .width = "${data.width}"
            .minWidth = "${data.minWidth}"
            .maxWidth = "${data.maxWidth}"
            .height = "${data.height}"
            .minHeight = "${data.minHeight}"
            .maxHeight = "${data.maxHeight}"
            .zIndex = "${data.zIndex}"
            name = "test2">Layout element</lit-layout>
    </lit-layout-grid>`;


const Template: Story<Partial<ILayoutElementProps>> = (data) => Layaout(data as ILayoutElementProps);

export const Default = Template.bind({});
Default.args = {
    top: 0, 
    left: 0, 
    width: 200, 
    minWidth: 200, 
    maxWidth: 400, 
    height: 200, 
    minHeight: 200, 
    maxHeight: 400, 
    zIndex: 1
}
export default {
    title: 'Other/Layout',
    argTypes: {
            
    },
    component: 'layaout-grid',
} as Meta;