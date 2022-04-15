import React, { useContext } from 'react';
import './Table.css';
import { TableContext } from './TableContext';

export type HeadCellRender<T = any> = React.FC<IHeadCellRenderProps<T>>;

export interface IHeadCellRenderProps<T> {
  columns: ITableCol[];
  colIndex: number;
}

export const defaultRenderHeadCell: HeadCellRender = ({ columns, colIndex }) => {
  const column = columns[colIndex];
  return <th>{column.label}</th>
}

export interface ITableCol {
  id: string;
  label: string;
}

export interface ITableHeadProps {
  renderHeadCell?: HeadCellRender;
}

export const TableHead = ({
  renderHeadCell = defaultRenderHeadCell,
  ...props
}: ITableHeadProps) => {
  const context = useContext(TableContext);
  const columns = context.columns;

  const headCells = columns.map((_, colIndex) => {
    return renderHeadCell({
      columns,
      colIndex
    })
  })

  return (
    <thead>
      <tr>
        {headCells}
      </tr>
    </thead>
  )
}
