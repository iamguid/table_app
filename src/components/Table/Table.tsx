import React from 'react';
import './Table.css';
import { ITableBodyProps, TableBody } from './TableBody';
import { TableContext } from './TableContext';
import { ITableCol, ITableHeadProps, TableHead } from './TableHead';

export interface ITableProps {
  columns: ITableCol[];
  children: React.ReactNode;
}

type ExtendedReactFC = React.FC<ITableProps> & {
  Head: React.FC<ITableHeadProps>,
  Body: React.FC<ITableBodyProps>,
} 

export const Table: ExtendedReactFC = ({ columns, children }: ITableProps) => {
  return (
    <TableContext.Provider value={{columns}}>
      <table className='table'>
        {children}
      </table>
    </TableContext.Provider>
  )
}

Table.Head = TableHead;
Table.Body = TableBody;
