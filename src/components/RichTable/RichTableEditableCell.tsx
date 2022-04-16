import { useState } from "react"
import { CellRender, ICellRenderProps } from "../Table/TableBody"
import { ITableCol } from "../Table/TableHead"

interface IRichTableEditableCellFactoryProps<TRow = any> {
  isEditable: (row: TRow, columns: ITableCol[], colIndex: number) => boolean;
  getViewComponent: (row: TRow, columns: ITableCol[], colIndex: number) => React.ReactNode;
  getEditComponent: (row: TRow, columns: ITableCol[], colIndex: number) => React.ReactNode;
  onEditComplete: () => void;
  onEditRollback: () => void;
}

export const richTableEditableCellFactory = ({
  isEditable,
  getViewComponent,
  getEditComponent,
}: IRichTableEditableCellFactoryProps): CellRender => {
  return ({ columns, colIndex, row }) => {
    const [isEditing, setIsEditing] = useState(false);

    const onCellClickCb = () => {
      if (isEditing) {
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    }

    const col = columns[colIndex];
    const data = row[col.id];
    const isCellEditable = isEditable(row, columns, colIndex) && Boolean(data);

    const viewComponent = getViewComponent(row, columns, colIndex);
    const editComponent = getEditComponent(row, columns, colIndex);

    if (isCellEditable) {
      return (
        <td onClick={onCellClickCb} className="rich-table__row__cell_editable">
          {isEditing && editComponent}
          {!isEditing && viewComponent}
        </td>
      );
    }

    return <td>-</td>
  }
}
