import '../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultRenderCell, defaultRenderCellData } from '../Table/TableBody';
import { ITableCol } from '../Table/TableHead';
import { AbstractRichTableLogic } from './AbstractRichTableLogic';
import { RichTable } from './RichTable';
import { richTableEditableCellFactory } from './RichTableEditableCell';
import { useEffect, useRef } from 'react';
import { EditString } from './EditComponents/EditString';

export default {
  title: 'RichTable',
  component: RichTable,
} as ComponentMeta<typeof RichTable>;

interface IRow {
  id: number;
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
  {id: 1, col1: 'row 1 col 1', col2: 'row 1 col 2'},
  {id: 2, col1: 'row 2 col 1', col2: 'row 2 col 2'},
  {id: 3, col1: 'row 3 col 1', col2: 'row 3 col 2'},
  {id: 4, col1: 'row 4 col 1', col2: 'row 4 col 2'},
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

  public rowDeleteRequest = async (rowId: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
  }

  public rowUpdateRequest = async (updatedRow: IRow): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
  }

  public rowsDeleteRequest = async (rowsIds: Set<number>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    });
  }

  public rowIdGetter = (row: IRow): number => {
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
    isEditable: () => true,
    editComponent: EditString,
    viewComponent: defaultRenderCellData,
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