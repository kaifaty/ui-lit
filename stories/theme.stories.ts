

import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/theme';
import { IThemeProps } from '../dist/theme/index';


const Theme = (data: IThemeProps) => 
    html`<lit-theme theme = "${data.theme}" style = "padding: 80px;">
        <lit-header level = "3">Buttons</lit-header>
        <lit-button>Button</lit-button>
        <lit-button primary>Primary</lit-button>
        <lit-button danger>Danger</lit-button>
        <lit-button success>Success</lit-button>
        <lit-button borderless>Borderless</lit-button>
        <hr>
        <lit-header level = "3">Inputs</lit-header>
        <div style = "padding: 10px 0; display: flex; align-items: end; ">
            <lit-number placeholder = "number"></lit-number>
            <lit-textfield placeholder = "text"></lit-textfield>
            <lit-textarea placeholder = "textarea"></lit-textarea>
        </div>
        <div style = "padding: 10px 0;">
            <checkbox-element type = "switcher"></checkbox-element>
        </div>
        <div style = "padding: 10px 0;">
            <checkbox-element type = "checkbox"></checkbox-element>
        </div>
        <hr>
        <lit-header level = "3">Tabs</lit-header>
        <lit-tabs value = "1">
            <lit-tab value = "1">Tab1</lit-tab>
            <lit-tab value = "2">Tab2</lit-tab>
            <lit-tab value = "3">Tab3</lit-tab>
        </lit-tabs>
        
        <hr>
        <lit-header level = "3">Select</lit-header>
        <lit-select value = "1">
            <lit-select-item value = "1">Item 1</lit-select-item>
            <lit-select-item value = "2">Item 2</lit-select-item>
            <lit-select-item value = "3">Item 3</lit-select-item>
        </lit-select>
        
        <hr>
        <lit-header level = "3">Treeview</lit-header>
        <tree-view value = "4">
            <tree-item value = "1">Item 1</tree-item>
            <tree-item value = "2">Item 2</tree-item>
            <tree-subview label = "SubView">
                <tree-item value = "3">Item 3</tree-item>
                <tree-item value = "4">Item 4</tree-item>
            </tree-subview>
        </tree-view>
        <hr>
        <lit-header level = "3">Spinner</lit-header>
        <lit-spinner fullContent ></lit-spinner>
        <hr>
        <lit-header level = "3">Circle</lit-header>
        <circle-percent 
            size = "77" 
            percent = "55"></circle-percent>
        <hr>
        <lit-header level = "3">QR CODE</lit-header>
        <lit-qrcode value = "test"></lit-qrcode>
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