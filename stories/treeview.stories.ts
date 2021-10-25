

import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/treeview';
import { ITreeViewProps } from '../src/treeview';

 
const TreeView = (data: ITreeViewProps) => 
    html`<tree-view selected = "main" >
            <tree-item value = "main" label = "Main item"></tree-item>
            <tree-item value = "second" label = "Second item"></tree-item>
            <tree-item label = "Third item">
                <tree-item value = "subItem1" label = "SubItem 1"></tree-item>
                <tree-item value = "subItem2" label = "SubItem 2"></tree-item>
            </tree-item>
        </tree-view>`;


const Template: Story<Partial<ITreeViewProps>> = (data) => TreeView(data as ITreeViewProps);

export const Default = Template.bind({});
Default.args = {
    items: [
        {text: "Main", value: "main"}, 
        {text: "Video", value: "Video"}, 
        {text: html`<tree-item .items = "${[{text: "Anime", value: "anome"}]}">Cartoon</tree-item>`, value: "cartoon"
    }],
    selected: "main",
    opened: true,
}
export default {
    title: 'Text/TreeView',
    argTypes: {
    },
    component: 'tree-view',
} as Meta;