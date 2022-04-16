import { useCallback, useContext } from "react";
import { CircleButton } from "../Circle/CircleButton";
import { CheckIcon } from "../Icons/icons/CheckIcon";
import { MinusIcon } from "../Icons/icons/MinusIcon";
import { HeadRender } from "../Table/TableHead";
import { RichTableContext } from "./RichTableContext";

export const RichTableHead: HeadRender = ({ children }) => {
  const context = useContext(RichTableContext);

  const isSomethingSelected = context.isSomethingSelected;

  const onSelectClick = useCallback(() => {
    if (isSomethingSelected) {
      context.unselectAll();
    } else {
      context.selectAll();
    }
  }, [isSomethingSelected])

  return (
    <tr>
      <th className="rich-table__head__selection-icon">
        <CircleButton onClick={onSelectClick} size={20} style={{
          background: '#6CEBFC',
          cursor: 'pointer',
        }}>
          {isSomethingSelected 
            ? <MinusIcon width={10} height={10} /> 
            : <CheckIcon width={10} height={10} />}
        </CircleButton>
      </th>
      {children}
      <th></th>
    </tr>
  )
}