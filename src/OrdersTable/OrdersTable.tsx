import { useEffect, useRef } from "react"
import { EditString } from "../components/RichTable/EditComponents/EditString";
import { RichTable } from "../components/RichTable/RichTable";
import { richTableEditableCellFactory } from "../components/RichTable/RichTableEditableCell";
import { defaultRenderCell } from "../components/Table/TableBody";
import { ITableCol } from "../components/Table/TableHead"
import { ordersApi } from "../ServiceLocator";
import { OrdersTableLogic } from "./OrdersTableLogic";

export interface IOrdersTableProps { }

export const OrdersTable = ({}: IOrdersTableProps) => {
  const logicRef = useRef(new OrdersTableLogic(ordersApi));

  const columnsRef = useRef<ITableCol[]>([
    { id: 'id', label: '№' },
    { id: 'msisdn', label: 'Телефон' },
    { id: 'trpl', label: 'Тариф' },
    { id: 'status', label: 'Статус' },
    { id: 'date', label: 'Дата' },
  ]);

  const cellRenderRef = useRef(richTableEditableCellFactory({
    isEditable: (row, columns, colIndex) => true,
    getEditComponent: (row, columns, colIndex) => <EditString row={row} columns={columns} colIndex={colIndex}/>,
    getViewComponent: (row, columns, colIndex) => defaultRenderCell({row, columns, colIndex}),
    onEditComplete: () => undefined,
    onEditRollback: () => undefined,
  }));

  useEffect(() => {
    logicRef.current.reloadAllRows();
  });

  return (
    <RichTable 
      logic={logicRef.current}
      columns={columnsRef.current}
      cellRender={cellRenderRef.current}
    />
  )
}