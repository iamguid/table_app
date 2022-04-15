import React from 'react';
import './Table.css';

export const defaultRenderHead = () => {}

export const defaultRenderHeadCell = () => {}

export const defaultRenderRow = () => {}

export const defaultRenderCell = () => {}

interface ITableProps {
  renderHead?: () => React.ReactNode;
  renderHeadCell?: () => React.ReactNode;
  renderRow?: () => React.ReactNode;
  renderCell?: () => React.ReactNode;
}

export const Table = ({ ...props }: ITableProps) => {
  return (

  )
}
