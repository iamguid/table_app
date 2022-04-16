import { ComponentStory, ComponentMeta } from '@storybook/react';
import { autorun } from 'mobx';
import { defaultRenderCell } from '../Table/TableBody';
import { ITableCol } from '../Table/TableHead';
import { AbstractRichTableLogic } from './AbstractRichTableLogic';
import { IRichTable } from './IRichTable';
import { RichTable } from './RichTable';

export default {
  title: 'RichTable',
  component: RichTable,
} as ComponentMeta<typeof RichTable>;

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

class RichTableLogicMock extends AbstractRichTableLogic<IRow> {
  public reloadAllRows = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._rawRows = rows;
        resolve();
      }, 1000)
    });
  }

  public rowDeleteRequest = async (rowId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
  }

  public rowsDeleteRequest = async (rowsIds: Set<string>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
  }

  public rowIdGetter = (row: IRow): string => {
      return row.id;
  }
}

const logic = new RichTableLogicMock(columns);

logic.reloadAllRows();

autorun(() => {
  console.log(logic.rows);
})

const RichTableTemplate: ComponentStory<typeof RichTable> = () => {
  return (
    <RichTable
      logic={logic}
      cellRender={defaultRenderCell}
    />
  )
};

export const SimpleRichTable = RichTableTemplate.bind({});