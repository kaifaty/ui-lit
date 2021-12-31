
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/qrcode';
import type { IQRCodeProps } from '../qrcode';


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