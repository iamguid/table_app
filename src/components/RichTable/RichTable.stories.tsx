import '../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultRenderCell } from '../Table/TableBody';
import { ITableCol } from '../Table/TableHead';
import { AbstractRichTableLogic } from './AbstractRichTableLogic';
import { RichTable } from './RichTable';
import { richTableEditableCellFactory } from './RichTableEditableCell';
import { useEffect, useRef } from 'react';

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

const SimpleRichTableTemplate: ComponentStory<typeof RichTable> = () => {
  const logicRef = useRef(new RichTableLogicMock());

  useEffect(() => {
    logicRef.current.reloadAllRows();
  });

  return (
    <RichTable
      logic={logicRef.current}
      columns={columns}
      cellRender={defaultRenderCell}
    />
  )
};

const EditingFieldsRichTableTemplate: ComponentStory<typeof RichTable> = () => {
  const logicRef = useRef(new RichTableLogicMock());

  const cellRenderRef = useRef(richTableEditableCellFactory({
    isEditable: (row, columns, colIndex) => true,
    getEditComponent: (row, columns, colIndex) => <span>edit</span>,
    getViewComponent: (row, columns, colIndex) => <span>view</span>,
    onEditComplete: () => undefined,
    onEditRollback: () => undefined,
  }));

  useEffect(() => {
    logicRef.current.reloadAllRows();
  });

  return (
    <RichTable
      logic={logicRef.current}
      columns={columns}
      cellRender={cellRenderRef.current}
    />
  )
};

export const SimpleRichTable = SimpleRichTableTemplate.bind({});
export const EditingFieldsRichTable = EditingFieldsRichTableTemplate.bind({});