import cn from 'classnames';
import { observer, Observer } from "mobx-react-lite";
import { useCallback, useContext } from "react";
import { CircleButton } from '../Circle/CircleButton';
import { CheckIcon } from '../Icons/icons/CheckIcon';
import { RowRender } from "../Table/TableBody";
import { RichTableContext } from "./RichTableContext";

export const RichTableRow: RowRender = ({ children, row }) => (
  <Observer>{() => {
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

    const isRowSelected = context.isRowSelected(row);

    const className = cn(
      'rich-table__row',
      {'rich-table__row_selected': isRowSelected}
    );

    return (
      <tr className={className}>
        <td className='rich-table__row__selection-icon'>
          <CircleButton onClick={onRowClick} size={20} style={{
            background: isRowSelected ? '#6CEBFC' : undefined,
            cursor: 'pointer',
            borderColor: isRowSelected ? undefined : '#6CEBFC',
          }}>
            {isRowSelected && <CheckIcon width={10} height={10} />}
          </CircleButton>
        </td>
        {children}
        <td>
          <span onClick={onRowDelete}>Delete</span>
        </td>
      </tr>
    )
  }}</Observer>
)
