
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/range';
import type { IRangeProps } from '../src/range';


const Range = (data: IRangeProps) => 
    html`<range-element 
        .value = "${data.value}"
        .valueAsNumber = "${data.valueAsNumber}"
        .min = "${data.min}"
        .max = "${data.max}"
        .usePoints = "${data.usePoints}"
        .startFromMin = "${data.startFromMin}"
        .disabled = "${data.disabled}"
        .showPercent = "${data.showPercent}"
    ></range-element>`;


const Template: Story<Partial<IRangeProps>> = (args) => Range(args as IRangeProps);

export const Default = Template.bind({});
Default.args = {
    value: '44',
    valueAsNumber: '44',
    min: 0,
    max:  100,
    usePoints:  true,
    startFromMin:  false,
    disabled:  false,
}
export const NoPoints = Template.bind({});
NoPoints.args = {
    value: '50',
    min: 0,
    max:  100,
    usePoints:  false,
    startFromMin:  false,
}
export default {
    title: 'Form Assosiated/Range Element',
    argTypes: {
        backgroundColor: { control: 'color' },
            
    },
    parameters: {
        actions: {
            // handles: ['changed'],
        }
    }
    
} as Meta;