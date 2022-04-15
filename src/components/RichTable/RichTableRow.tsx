import { useCallback, useContext } from "react";
import { RowRender } from "../Table/TableBody";
import { RichTableContext } from "./RichTableContext";

export const RichTableRow: RowRender = ({ children, row }) => {
  const context = useContext(RichTableContext);

  const onRowClick = useCallback(() => {
    if (context.isRowSelected(row)) {
      context.onRowSelectToggle(row, false);
    } else {
      context.onRowSelectToggle(row, true);
    }
  }, [context, row])

  const onRowDelete = useCallback(() => {
    context.onRowDelete(row);
  }, [context, row])

  return (
    <tr>
      <td>
        <span onClick={onRowClick}>{context.isRowSelected(row) ? 'Selected' : 'Unselected'}</span>
      </td>
      {children}
      <td>
        <span onClick={onRowDelete}>Delete</span>
      </td>
    </tr>
  )
}
