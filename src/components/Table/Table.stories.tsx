import '../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table } from './Table';
import { ITableCol } from './TableHead';

export default {
  title: 'Table',
  component: Table,
} as ComponentMeta<typeof Table>;

interface IRow {
  id: string;
  col1: string;
  col2: string;
}

const columns: ITableCol[] = [
  {
    id: 'col1',
    label: 'Test col 1'
  },
  {
    id: 'col2',
    label: 'Test col 2'
  }
];

const rows: IRow[] = [
  {id: '1', col1: 'row 1 col 1', col2: 'row 1 col 2'},
  {id: '2', col1: 'row 2 col 1', col2: 'row 2 col 2'},
  {id: '3', col1: 'row 3 col 1', col2: 'row 3 col 2'},
  {id: '4', col1: 'row 4 col 1', col2: 'row 4 col 2'},
];

const SimpleTableTemplate: ComponentStory<typeof Table> = () => {
  return (
    <Table columns={columns}>
      <Table.Head/>
      <Table.Body rows={rows} rowIdGetter={(row: IRow) => row.id}/>
    </Table>
  );
};

export const SimpleTable = SimpleTableTemplate.bind({});