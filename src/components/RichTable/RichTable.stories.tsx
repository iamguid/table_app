import { useCallback } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Reducer, useReducer } from 'react';
import { defaultRenderCell } from '../Table/TableBody';
import { ITableCol } from '../Table/TableHead';
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

interface Action<TPayload> {
  type: string;
  payload: TPayload;
}

interface State {
  selected: Set<string>;
  columns: ITableCol[];
  rows: IRow[];
}

let columns: ITableCol[] = [
  {
    id: 'col1',
    label: 'Test col 1'
  },
  {
    id: 'col2',
    label: 'Test col 2'
  }
];

let rows: IRow[] = [
  {id: '1', col1: 'row 1 col 1', col2: 'row 1 col 2'},
  {id: '2', col1: 'row 2 col 1', col2: 'row 2 col 2'},
  {id: '3', col1: 'row 3 col 1', col2: 'row 3 col 2'},
  {id: '4', col1: 'row 4 col 1', col2: 'row 4 col 2'},
];

const RichTableTemplate: ComponentStory<typeof RichTable> = (args) => {
  const reducer: Reducer<State, Action<string>> = (state, action) => {
    switch (action.type) {
      case 'select':
        state.selected.add(action.payload);
        break;
      case 'unselect':
        state.selected.delete(action.payload);
        break;
      case 'delete':
        rows = rows.filter(row => row.id !== action.payload);
        break;
      default:
        throw new Error('Unexpected action ' + action.type);
    }

    return { selected: new Set(state.selected), columns, rows };
  }

  const [state, dispatch] = useReducer(reducer, { selected: new Set<string>(), columns, rows });

  const selectCb = useCallback((row: IRow, selected: boolean) => {
    if (selected) {
      dispatch({ type: 'select', payload: row.id })
    } else {
      dispatch({ type: 'unselect', payload: row.id })
    }
  })

  const isRowSelectedCb = useCallback((row: IRow) => {
    return state.selected.has(row.id);
  })

  const deleteCb = useCallback((row: IRow) => {
    dispatch({ type: 'delete', payload: row.id });
  })

  return (
    <RichTable
      columns={columns}
      rows={rows}
      rowIdGetter={(row: IRow) => row.id}
      isRowSelected={isRowSelectedCb}
      cellRender={defaultRenderCell}
      onRowSelectToggle={selectCb}
      onRowDelete={deleteCb}
    />
  )
};

export const SimpleRichTable = RichTableTemplate.bind({});