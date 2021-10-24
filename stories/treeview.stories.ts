

import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/treeview';
import { ITreeViewProps } from '../src/treeview';

 
const TreeView = (data: ITreeViewProps) => 
    html`<treeview-root>
            <treeitem-element value = "main" label = "Main item"></treeitem-element>
            <treeitem-element value = "second" label = "Second item"></treeitem-element>
            <treeitem-element label = "Third item">
                <treeitem-element value = "subItem1" label = "SubItem 1"></treeitem-element>
                <treeitem-element value = "subItem2" label = "SubItem 2"></treeitem-element>
            </treeitem-element>
        </treeview-root>`;


const Template: Story<Partial<ITreeViewProps>> = (data) => TreeView(data as ITreeViewProps);

export const Default = Template.bind({});
Default.args = {
    items: [
        {text: "Main", value: "main"}, 
        {text: "Video", value: "Video"}, 
        {text: html`<treeview-element .items = "${[{text: "Anime", value: "anome"}]}">Cartoon</treeview-element>`, value: "cartoon"
    }],
    selected: "main",
    opened: true,
}
export default {
    title: 'Text/TreeView',
    argTypes: {
    },
    component: 'treeview-element',
} as Meta;