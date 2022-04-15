import { HeadCellRender } from "../Table/TableHead";

export const RichTableHeadCell: HeadCellRender = ({ columns, colIndex }) => {
  const column = columns[colIndex];
  return <th>{column.label}</th>
}
