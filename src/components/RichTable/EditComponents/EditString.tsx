import { useState } from "react";
import { Input } from "../../Input/Input";
import { CellRender } from "../../Table/TableBody";

export const EditString: CellRender = ({row, colIndex, columns}) => {
  const column = columns[colIndex];
  const data = row[column.id];

  const [state, setState] = useState(data);

  return <Input value={state} onChange={setState} />
}