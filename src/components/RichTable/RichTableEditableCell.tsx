import React, { useContext, useState } from "react"
import { CellRender, ICellDataRenderProps, ICellRenderProps } from "../Table/TableBody"
import { ITableCol } from "../Table/TableHead"
import { RichTableContext } from "./RichTableContext";

export interface IRichTableEditableCellDataRenderProps<TRow, TData> extends ICellDataRenderProps<TRow> {
  onEditComplete: (newValue?: TData) => void;
}

export type RichTableEditableCellDataRender<TRow = any, TData = any> = React.FC<IRichTableEditableCellDataRenderProps<TRow, TData>>;

interface IRichTableEditableCellFactoryProps<TRow = any> {
  isEditable: (props: IRichTableEditableCellDataRenderProps<TRow, string>) => boolean;
  viewComponent: (props: IRichTableEditableCellDataRenderProps<TRow, string>) => React.ReactNode;
  editComponent: (props: IRichTableEditableCellDataRenderProps<TRow, string>) => React.ReactNode;
}

export const richTableEditableCellFactory = ({
  isEditable,
  viewComponent,
  editComponent,
}: IRichTableEditableCellFactoryProps): CellRender => {
  return ({ columns, colIndex, row }) => {
    const col = columns[colIndex];
    const data = row[col.id];

    const context = useContext(RichTableContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCellClickCb = () => {
      setIsEditing(true);
    }

    const onEditCompleteCb = async (updatedData?: string) => {
      if (updatedData) {
        const updatedRow = Object.assign({}, row, {[col.id]: updatedData});
        setIsLoading(true);
        await context.onRowUpdate(updatedRow);
        setIsLoading(false);
      }

      setIsEditing(false);
    }

    const editableCellDataProps: IRichTableEditableCellDataRenderProps<any, any> = {
      row,
      columns,
      colIndex,
      onEditComplete: onEditCompleteCb
    }

    const isCellEditable = isEditable(editableCellDataProps) && typeof data !== 'undefined';

    const view = viewComponent(editableCellDataProps);
    const edit = editComponent(editableCellDataProps);

    if (isLoading) {
      return (
        <td>Loading...</td>
      )
    }

    if (isCellEditable) {
      return (
        <td onClick={onCellClickCb} className="rich-table__row__cell_editable">
          {isEditing && edit}
          {!isEditing && view}
        </td>
      );
    }

    return <td>{view}</td>
  }
}
