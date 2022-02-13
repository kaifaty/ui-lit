

import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/treeview';
import { ITreeViewProps } from '../src/treeview';

 
const TreeView = (data: ITreeViewProps) => 
    html`<lit-tree-view value = "${data.value}" >
            <lit-tree-item value = "main">Main item</lit-tree-item>
            <lit-tree-item value = "second">Second item</lit-tree-item>
            <lit-tree-subview label = "Third item">
                <lit-tree-item value = "subItem1">SubItem 1</lit-tree-item>
                <lit-tree-item value = "subItem2">SubItem 2</lit-tree-item>
                
                <lit-tree-subview label = "Sub 2 level">
                    <lit-tree-item value = "subItem3">SubItem 3</lit-tree-item>
                    <lit-tree-item value = "subItem4">SubItem 4</lit-tree-item>
                </lit-tree-subview>
            </lit-tree-subview>
        </lit-tree-view>`;


const Template: Story<Partial<ITreeViewProps>> = (data) => TreeView(data as ITreeViewProps);

export const Default = Template.bind({});
Default.args = {
    value: "main",
}
export default {
    title: 'Text/TreeView',
    argTypes: {
    },
    component: 'lit-tree-view',
} as Meta;