import classNames from "classnames";
import cn from "classnames";
import { useCallback, useContext } from "react";
import { SortIcon } from "../Icons/icons/SortIcon";
import { HeadCellRender } from "../Table/TableHead";
import { RichTableContext } from "./RichTableContext";

export const RichTableHeadCell: HeadCellRender = ({ columns, colIndex }) => {
  const logic = useContext(RichTableContext).logic!;
  const column = columns[colIndex];

  const onClick = useCallback(() => {
    if (column.id === logic.sortState?.colId) {
      logic.sortBy(column.id, logic.sortState!.sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      logic.sortBy(column.id, 'desc')
    }
  }, [column, logic])

  const className = cn(
    'rich-table__head__th',
    {'rich-table__head__th_selected': column.id === logic.sortState?.colId},
  )

  return (
    <th onClick={onClick} className={className}>
      <div className="rich-table__head__th__inner">
        {column.label}
        <SortIcon
          width={10}
          height={10}
          style={{ 
            transform: logic.sortState?.sortOrder == 'asc' 
              ? 'rotate(180deg)' 
              : 'rotate(0deg)'
          }}
        />
      </div>
    </th>
  )
}
