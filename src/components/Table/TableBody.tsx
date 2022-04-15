import React, { useContext } from 'react';
import './Table.css';
import { TableContext } from './TableContext';
import { ITableCol } from './TableHead';

export type RowRender<T = any> = React.FC<IRowRenderProps<T>>;
export type CellRender<T = any> = React.FC<ICellRenderProps<T>>;

export interface IRowRenderProps<TRow> {
  key: React.Key;
  row: TRow;
  columns: ITableCol[];
  children: React.ReactNode;
}

export interface ICellRenderProps<TRow> {
  key: React.Key;
  row: TRow;
  columns: ITableCol[];
  colIndex: number;
}

export const defaultRenderRow: RowRender = ({ children }) => {
  return <tr>{children}</tr>;
}

export const defaultRenderCell: CellRender = ({ columns, colIndex, row }) => {
  const col = columns[colIndex];
  const data = row[col.id];

  if (data) {
    return <td>{data}</td>;
  }

  return <td>-</td>;
}

export interface ITableBodyProps {
  rows: any[];
  rowIdGetter: (row: any) => string;
  renderRow?: RowRender;
  renderCell?: CellRender;
}

export const TableBody = ({ 
  rows,
  rowIdGetter,
  renderRow = defaultRenderRow,
  renderCell = defaultRenderCell,
}: ITableBodyProps) => {
  const context = useContext(TableContext);

  const RenderCell = renderCell;
  const RenderRow = renderRow;

  const columns = context.columns;

  const rowsElements = rows.map(row => {
    const rowId = rowIdGetter(row);

    const cellsElements = columns.map((col, colIndex) => {
      return (
        <RenderCell
          key={rowId + col.id}
          row={row}
          columns={columns}
          colIndex={colIndex}
        />
      )
    })

    return (
      <RenderRow key={rowId} columns={columns} row={row}>
        {cellsElements}
      </RenderRow>
    );
  });
  
  return <tbody>{rowsElements}</tbody>;
}
