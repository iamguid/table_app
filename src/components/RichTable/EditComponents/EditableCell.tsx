import { EditIcon } from "../../Icons/icons/EditIcon";
import { RichTableEditableCellDataRender } from "../RichTableEditableCell";

export const EditableCell: RichTableEditableCellDataRender = ({ row, columns, colIndex }) => {
  const col = columns[colIndex];
  const data = row[col.id];

  if (typeof data !== 'undefined') {
    return (
      <>
        {data.toString()}
        <EditIcon width={15} height={15}/>
      </>
    )
  }

  return <span>-</span>;
}