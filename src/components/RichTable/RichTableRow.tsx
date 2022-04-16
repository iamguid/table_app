import { Observer } from "mobx-react-lite";
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
  }, [])

  const onRowDelete = useCallback(() => {
    context.onRowDelete(row);
  }, [])

  return (
    <tr>
      <td>
        <span onClick={onRowClick}>
          <Observer>{
            () => {
              return context.isRowSelected(row) ? <span>Selected</span> : <span>Unselected</span>
            }}
          </Observer>
        </span>
      </td>
      {children}
      <td>
        <span onClick={onRowDelete}>Delete</span>
      </td>
    </tr>
  )
}
