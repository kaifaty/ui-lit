
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/pagination';
import type { IPaginationProps } from '../src/pagination';


const Pagination = (data: IPaginationProps) => 
    html`<pagination-element 
        .page = "${data.page}"
        .limit = "${data.pageLength}"
        .length = "${data.length}"
    ></pagination-element>`;


const Template: Story<Partial<IPaginationProps>> = (args) => Pagination(args as IPaginationProps);

export const Default = Template.bind({});
Default.args = {
    page: 0,
    pageLength: 5,
    length: 15,
}
export default {
    title: 'Other/Pagination',
    argTypes: {
            
    },
    component: 'pagination-element',
} as Meta;