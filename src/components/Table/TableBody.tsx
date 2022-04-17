import React, { useContext } from 'react';
import './Table.css';
import { TableContext } from './TableContext';
import { ITableCol } from './TableHead';

export type RowRender<T = any> = React.FC<IRowRenderProps<T>>;
export type CellRender<T = any> = React.FC<ICellRenderProps<T>>;
export type CellDataRender<T = any> = React.FC<ICellDataRenderProps<T>>;

export interface IRowRenderProps<TRow> {
  row: TRow;
  columns: ITableCol[];
  children: React.ReactNode;
}

export interface ICellRenderProps<TRow> {
  row: TRow;
  columns: ITableCol[];
  colIndex: number;
  children: React.ReactNode;
}

export interface ICellDataRenderProps<TRow> {
  row: TRow;
  columns: ITableCol[];
  colIndex: number;
}

export const defaultRenderRow: RowRender = ({ children }) => {
  return <tr>{children}</tr>;
}

export const defaultRenderCell: CellRender = ({ children }) => {
  return <td>{children}</td>;
}

export const defaultRenderCellData: CellDataRender = ({ columns, colIndex, row }) => {
  const col = columns[colIndex];
  const data = row[col.id];

  if (typeof data !== 'undefined') {
    return data.toString();
  }

  return '-';
}

export interface ITableBodyProps {
  rows: any[];
  rowIdGetter: (row: any) => number;
  renderRow?: RowRender;
  renderCell?: CellRender;
  renderCellData?: CellDataRender;
}

export const TableBody = ({ 
  rows,
  rowIdGetter,
  renderRow = defaultRenderRow,
  renderCell = defaultRenderCell,
  renderCellData = defaultRenderCellData,
}: ITableBodyProps) => {
  const context = useContext(TableContext);

  const RenderRow = renderRow;
  const RenderCell = renderCell;
  const RenderCellData = renderCellData;

  const columns = context.columns;

  const rowsElements = rows.map(row => {
    const rowId = rowIdGetter(row);

    const cellsElements = columns.map((col, colIndex) => (
      <RenderCell
        key={rowId + col.id}
        row={row}
        columns={columns}
        colIndex={colIndex}
      >
        <RenderCellData
          row={row}
          columns={columns}
          colIndex={colIndex}
        />
      </RenderCell>
    ))

    return (
      <RenderRow key={rowId} columns={columns} row={row}>
        {cellsElements}
      </RenderRow>
    );
  });
  
  return <tbody>{rowsElements}</tbody>;
}
