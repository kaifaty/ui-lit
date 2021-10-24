
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/qrcode';
import type { IQRCodeProps } from '../src/qrcode';


const QRCode = (data: IQRCodeProps) => 
    html`<qrcode-element 
        .value = "${data.value}"
    ></qrcode-element>`;


const Template: Story<Partial<IQRCodeProps>> = (args) => QRCode(args as IQRCodeProps);

export const Default = Template.bind({});
Default.args = {
    value: 'My QR Code',
}
export default {
    title: 'Other/QRCode',
    argTypes: {
            
    },
    component: 'qrcode-element',
} as Meta;