import { Observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react"

import './OrdersTable.css';

import { EditableCell } from "../components/RichTable/EditComponents/EditableCell";
import { EditString } from "../components/RichTable/EditComponents/EditString";
import { RichTable } from "../components/RichTable/RichTable";
import { richTableEditableCellFactory } from "../components/RichTable/RichTableEditableCell";
import { ITableCol } from "../components/Table/TableHead"
import { ordersApi } from "../ServiceLocator";
import { OrdersTableFooter } from "./OrdersTableFooter";
import { OrdersTableLogic } from "./OrdersTableLogic";
import { OrdersTableHeader } from "./OrdersTableHeader";

export interface IOrdersTableProps { }

export const OrdersTable = ({}: IOrdersTableProps) => {
  const logicRef = useRef(new OrdersTableLogic(ordersApi));

  const columnsRef = useRef<ITableCol[]>([
    { id: 'id', label: '№' },
    { id: 'msisdn', label: 'Телефон' },
    { id: 'name', label: 'ФИО' },
    { id: 'trpl', label: 'Тариф' },
    { id: 'status', label: 'Статус' },
    { id: 'date', label: 'Дата' },
  ]);

  const cellRenderRef = useRef(richTableEditableCellFactory({
    isEditable: ({row, columns, colIndex}) => {
      const column = columns[colIndex];
      return column.id !== 'id';
    },
    editComponent: EditString,
    viewComponent: EditableCell,
  }));

  useEffect(() => {
    logicRef.current.reloadAllRows();
  }, []);

  const onDeleteSelectedCb = useCallback(() => {
    logicRef.current.onDeleteSelectedRows();
  }, []);

  const onUpdateSelectedCb = useCallback(() => {
    console.log('Open update slected modal')
  }, []);

  return (
    <div className="orders-table-container">
      <OrdersTableHeader logic={logicRef.current} />
      <RichTable 
        logic={logicRef.current}
        columns={columnsRef.current}
        cellRender={cellRenderRef.current}
      />
      {<Observer>{() => (
        <OrdersTableFooter 
          totalCount={logicRef.current.totalCount}
          selectedCount={logicRef.current.selectedCount}
          filteredCount={logicRef.current.filteredCount}
          onDeleteSelected={onDeleteSelectedCb}
          onUpdateSelected={onUpdateSelectedCb}
        />
      )}</Observer>}
    </div>
  )
}