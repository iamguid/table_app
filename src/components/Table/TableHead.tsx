import React, { useContext } from 'react';
import './Table.css';
import { TableContext } from './TableContext';

export type HeadCellRender<T = any> = React.FC<IHeadCellRenderProps<T>>;
export type HeadRender<T = any> = React.FC<IHeadRenderProps<T>>;

export interface IHeadCellRenderProps<T> {
  columns: ITableCol[];
  colIndex: number;
}

export interface IHeadRenderProps<T> {
  children: React.ReactNode;
}

export const defaultRenderHeadCell: HeadCellRender = ({ columns, colIndex }) => {
  const column = columns[colIndex];
  return <th>{column.label}</th>
}

export const defaultRenderHead: HeadRender = ({ children }) => (
  <tr>{children}</tr>
)

export interface ITableCol {
  id: string;
  label: string;
}

export interface ITableHeadProps {
  renderHeadCell?: HeadCellRender;
  renderHead?: HeadRender;
}

export const TableHead = ({
  renderHead = defaultRenderHead,
  renderHeadCell = defaultRenderHeadCell,
}: ITableHeadProps) => {
  const context = useContext(TableContext);

  const columns = context.columns;

  const RenderHeadCell = renderHeadCell;
  const RenderHead = renderHead;

  const headCells = columns.map((column, colIndex) => (
    <RenderHeadCell
      key={column.id}
      columns={columns}
      colIndex={colIndex}
    />
  ))

  return (
    <thead>
      <RenderHead>
        {headCells}
      </RenderHead>
    </thead>
  )
}
