
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../src/table';
import { ISourceItem } from '../src/table';

const data = {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
};
  
const columns = [
/*{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',    
    sorter: (a, b, direction) => {
        if(a.name > b.name) return direction === 'ascend' ? 1 : -1;
        if(a.name < b.name) return direction === 'ascend' ? -1 : 1;
        return 0;
    },
    //defaultSort: true
},*/
{ 
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    valueFn: (item) => item.age + "y.", 
    sorter: true,
    width: 50,
    filters: [
      {
        text: 'Age = 22',
        value: 22,
      },
      {
        text: 'Select', 
        placeholder: '',       
        type: 'select',
        items: [
          "1",
          "2",
          "3",
          "4",
          "5",
        ]
      },
      {
        text: 'More then', 
        placeholder: 'from',       
        type: 'date',
        onFilter: (value: unknown, row: ISourceItem) => {
            return row.age > value
        }
      },
      {     
        type: 'checkbox',
        text: '> 1 && < 5',
        onFilter: (value: unknown, row: ISourceItem) => {
            return row.age > 1 && row.age < 5
        }
      },
    ],
},

{
  key: "name",
  title: "name",
  filters: [
    {     
      type: 'checkbox',
      text: '> 10 && < 15',
      onFilter: (value: unknown, row: ISourceItem) => {
          return row.age > 10 && row.age < 15
      }
    },
  ],
},
{
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: true,
    width: 50,
    filters: [
      {     
        type: 'checkbox',
        text: '> 10 && < 15',
        onFilter: (value: unknown, row: ISourceItem) => {
            return row.address > 30 && row.address < 55
        }
      },
    ],
},
];

const dataSource = [...Array(35)].map((it, i) => 
    ({...data, key: i, age: i, address: i * 2, name: data.name + i}))
    .sort((a, b, direction) => {
        if(a.name > b.name) return direction === 'ascend' ? 1 : -1;
        if(a.name < b.name) return direction === 'ascend' ? -1 : 1;
        return 0;
    }) as any;

// dataSource

const click = (e: CustomEvent) => {
  alert(e.detail);
}

const buttonClick = () => {
  const d = document.querySelector("lit-table");
  d.setFilter("age", 0,
    {
      text: 'Age = 22',
      value: 22,
      checked: true
    },
  )
}

const rowSelect = (d: typeof data) => {
  return d.key == "7"
}

const Table = (text: string) => 
    html`
    <style>
      lit-table{
        --lit-table-cursor: pointer;
      }
    </style>
    <button @click = "${buttonClick}">Filter</button>
    <lit-table
        style = "width: 330px; height: 400px;"
        pagination
        paginationToHeight        
        defaultSort = "age"
        .dataSource = "${dataSource}"
        .columns = "${columns}"
        .rowSelect = "${rowSelect}"
        rowHeight = "25"
        headerHeight = "20"
        @rowClick = "${click}"
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