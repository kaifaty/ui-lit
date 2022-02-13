
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/pagination';
import type { IPaginationProps } from '../src/pagination';


const Pagination = (data: IPaginationProps) => 
    html`<lit-pagination 
        .page = "${data.page}"
        .limit = "${data.pageLength}"
        .length = "${data.length}"
    ></lit-pagination>`;


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
    component: 'lit-pagination',
} as Meta;