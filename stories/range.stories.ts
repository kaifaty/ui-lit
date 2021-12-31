
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/range';
import type { IRangeProps } from '../range';


const Range = (data: IRangeProps) => 
    html`<lit-range 
        .value = "${data.value}"
        .valueAsNumber = "${data.valueAsNumber}"
        .min = "${data.min}"
        .max = "${data.max}"
        .usePoints = "${data.usePoints}"
        .startFromMin = "${data.startFromMin}"
        .disabled = "${data.disabled}"
        .showPercent = "${data.showPercent}"
    ></lit-range>`;


const Template: Story<Partial<IRangeProps>> = (args) => Range(args as IRangeProps);

export const Default = Template.bind({});
Default.args = {
    value: '44',
    valueAsNumber: '44',
    min: 0,
    max:  100,
    usePoints:  true,
    showPercent:  true,
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
    showPercent:  true,
}
export default {
    title: 'Form Assosiated/Range',
    argTypes: {
            
    },
    parameters: {
        actions: {
            // handles: ['changed'],
        },
        docs: {
            description: {
                component: '### Usage: \n `<lit-range></lit-range>`',
            },
        },
    },
    component: 'lit-range',
    
    
    
} as Meta;