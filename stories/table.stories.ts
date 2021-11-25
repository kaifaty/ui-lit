
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import '../dist/table';
import { ISourceItem } from '../src/table/table';

const data = {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
};
  
const columns = [
{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',    
    sorter: (a, b, direction) => {
        if(a.name > b.name) return direction === 'ascend' ? 1 : -1;
        if(a.name < b.name) return direction === 'ascend' ? -1 : 1;
        return 0;
    },
},
{ 
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    valueFn: (item) => item.age + "y.", 
    sorter: true,
    filters: [
      {
        text: '22',
        value: 22,
      },
      {
        placeholder: '> then',       
        type: 'input',
        onFilter: (value: unknown, row: ISourceItem) => row.age > value
      },
    ],
    defaultSort: true
},
{
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: true
},
];

const dataSource = [...Array(35)].map((it, i) => 
    ({...data, key: i, age: i, address: i * 2, name: data.name + i})) as any;

const Table = (text: string) => 
    html`
    <lit-table
        style = "width: 400px; height: 400px;"
        pagination
        paginationToHeight        
        defaultSort = "age"
        .dataSource = "${dataSource}"
        .columns = "${columns}"
        rowHeight = "20"
        headerHeight = "20"
    ></lit-table>`;


const Template: Story<Partial<{text: string}>> = (data) => Table(data.text);

export const Default = Template.bind({});
Default.args = {
}
export default {
    title: 'Text/Table',
    argTypes: {
            
    },
    component: 'lit-table',
} as Meta;