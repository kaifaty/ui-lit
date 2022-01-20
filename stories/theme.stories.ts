

import { html } from 'lit-html';
import { html as _html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/theme';
import '../dist/theme/switcher';
import { IThemeProps } from '../dist/theme/interface';

const tableData = [
    {key: 'checkbox', content: _html`<lit-checkbox></lit-checkbox>`},
    {key: 'switcher', content: _html`<lit-checkbox type = "checkbox"></lit-checkbox>`},
    {key: 'button', content: _html`<lit-button>Button</lit-button>`},
    {key: 'tabs', content: _html`<lit-tabs value = "1">
                                    <lit-tab value = "1">Tab 1</lit-tab>
                                    <lit-tab value = "2">Tab 2</lit-tab>
                                </lit-tabs>`},
];

const columns = [
    {
        key: "type", 
        title: "Type", valueFn: (it) => it.key, 
        filters: [
            {
                text: "from", 
            }
        ],
        sorter: (a, b) => a.key > b.key
    },
    {key: "content", title: "Content", valueFn: (it) => it.content},
];
const Theme = (data: IThemeProps) => 
    html`
    <style>
        .containter{
            gap: 10px; 
            display: grid; 
            align-items: center; 
            grid-template-columns: 1fr 1fr;
        }
        .lit-theme{
            --lit-percent-size: 50px;
        }
        lit-range{
            width: 100%;
        }
        main{
            display: grid; 
            gap: 50px 150px; 
            grid-template-columns: repeat(auto-fit, minmax(300px, auto));
            padding: 30px 50px;
        }
        header{
            padding: 20px 50px;
            display: grid;
            gap: 20px;
        }
        .row-between{
            display: flex; 
            justify-content: space-between; 
            align-items: center;
        }
    </style>
    <lit-theme >
        <header>
            <div class = "row-between">
                <lit-header level = "2" style = "margin: 0;">Switch theme</lit-header> 
                <div>
                    <lit-theme-switcher></lit-theme-switcher>
                </div>
            </div>
            <lit-theme-configer></lit-theme-configer>
        </header>
        <lit-divider></lit-divider>
        <main>
            
            <div>
                <lit-header level = "3">Select</lit-header>
                <lit-select value = "1">
                    <lit-option value = "1">Item 1</lit-option>
                    <lit-option value = "2">Item loooooooooooong 2</lit-option>
                    <lit-option value = "3">Item 3</lit-option>
                    <lit-opt-group>
                        <lit-option value = "5">Item 77</lit-option>
                        <lit-option value = "6">Item 99</lit-option>
                    </lit-opt-group>
                </lit-select>
            </div>
            <div class = "row-between">
                    <lit-header level = "2" style = "margin: 0;">Menu</lit-header> 
                <div>
                    <lit-menu label = "Menu">
                        <lit-menu-item>Option loooooooooooong 1</lit-menu-item>
                        <lit-menu-item>Option 2</lit-menu-item>
                    </lit-menu>
                </div>
            </div>
            <div>
                <lit-header level = "3">Dialog</lit-header>
                <lit-button @click = "${() => document.querySelector(`lit-dialog`).open()}}">open dialog</lit-button>
                <lit-dialog >
                    <lit-header slot = "header" level = "3">Header</lit-header>
                    <div>
                        Content
                    </div>
                    <footer slot = "footer">Footer</footer>

                </lit-dialog>
            </div>
            <div>
                <lit-header level = "3">Table</lit-header>
                <lit-table 
                    .rowHeight = "${40}"
                    .dataSource = "${tableData}" 
                    .columns = "${columns}">
                </lit-table>
            </div>
            <div >
                <lit-header level = "3">Buttons</lit-header>
                <div style = "display: grid; width: 300px; gap: 5px;">
                    <lit-button borderless>Borderless</lit-button>
                    <lit-button>Button</lit-button>
                    <lit-button primary>Primary</lit-button>
                    <lit-button success>Success</lit-button>
                    <lit-button danger>Danger</lit-button>
                    <lit-button type = "switch">Switch</lit-button>
                </div>
            </div>
            <div>
                <lit-header level = "3">Inputs</lit-header>
                <div class = "containter">

                        <lit-label for = "number">Number field</lit-label> 
                        <lit-numberfield id = "number" placeholder = "number"></lit-numberfield>
                    
                        <lit-label for = "textfield">Text field</lit-label> 
                        <lit-textfield id = "textfield" placeholder = "text"></lit-textfield>

                        <div>
                            <lit-label for = "textarea">Text area</lit-label>
                            <lit-description>Description of text area</lit-description>
                        </div>
                        <lit-textarea id = "textarea" placeholder = "textarea"></lit-textarea>
                    
                </div>
            </div>
            <div>
                <lit-header level = "3">Range</lit-header>
                <lit-range></lit-range>
            </div>
            <div>
                <lit-header level = "3">Checkbox</lit-header>
                
                <div class = "containter">
                    <lit-label for = "switcher">Switcher</lit-label> 
                    <lit-checkbox id = "switcher" type = "switcher"></lit-checkbox>

                    
                    <lit-label for = "checkbox">Checkbox</lit-label> 
                    <lit-checkbox id = "checkbox" type = "checkbox"></lit-checkbox>
                </div>
            </div>
            <div>
                <lit-header level = "3">Tabs</lit-header>
                <lit-tabs value = "1" type = "tab" style = "width: 200px">
                    <lit-tab value = "1">Tab1</lit-tab>
                    <lit-tab value = "2">Tab2</lit-tab>
                    <lit-tab value = "3">Tab3</lit-tab>
                    <lit-tab value = "4">Tab5</lit-tab>
                </lit-tabs>
            </div>
            <div>
                <lit-header level = "3">TreeView</lit-header>
                <lit-tree-view value = "4">
                    <lit-tree-item value = "1">Item 1</lit-tree-item>
                    <lit-tree-item value = "2">Item 2</lit-tree-item>
                    <lit-tree-subview label = "SubView">
                        <lit-tree-item value = "3">Item 3</lit-tree-item>
                        <lit-tree-item value = "4">Item 4</lit-tree-item>
                    </lit-tree-subview>
                </lit-tree-view>
            </div>
            <div>
                <lit-header level = "3">Spinner</lit-header>
                <div style = "width: 100px">
                    <lit-spinner></lit-spinner>
                </div>
            </div>
            <div>
                <lit-header level = "3">Circle</lit-header>
                <lit-circle 
                    style = "--lit-circle-color: #d11198;"
                    size = "50"
                    percent = "55"></lit-circle>
            </div>
            <div>
                <lit-header level = "3">QR CODE</lit-header>
                <lit-qrcode value = "test"></lit-qrcode>
            </div>
        </main>
    </lit-theme>`;


const Template: Story<Partial<IThemeProps>> = (data) => Theme(data as IThemeProps);

export const Default = Template.bind({});
Default.args = {
    theme: 'dark',
}
export default {
    title: 'Other/Theme',
    argTypes: {
        theme: {
            options: ['light', 'dark'],
            control: { type: 'radio' }
        }
    },
    component: 'lit-theme',
} as Meta;