
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/qrcode';
import type { IQRCodeProps } from '../src/qrcode';


const QRCode = (data: IQRCodeProps) => 
    html`<lit-qrcode 
        .value = "${data.value}"
    ></lit-qrcode>`;


const Template: Story<Partial<IQRCodeProps>> = (args) => QRCode(args as IQRCodeProps);

export const Default = Template.bind({});
Default.args = {
    value: 'My QR Code',
}
export default {
    title: 'Other/QRCode',
    argTypes: {
            
    },
    component: 'lit-qrcode',
} as Meta;