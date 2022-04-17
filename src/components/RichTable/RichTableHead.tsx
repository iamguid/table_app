import { Observer } from "mobx-react-lite";
import { useCallback, useContext } from "react";
import { CircleButton } from "../Circle/CircleButton";
import { CheckIcon } from "../Icons/icons/CheckIcon";
import { MinusIcon } from "../Icons/icons/MinusIcon";
import { HeadRender } from "../Table/TableHead";
import { RichTableContext } from "./RichTableContext";

export const RichTableHead: HeadRender = ({ children }) => {
  const logic = useContext(RichTableContext).logic!;

  const onSelectClick = useCallback(() => {
    if (logic.isSomethingSelected) {
      logic.unselectAll();
    } else {
      logic.selectAll();
    }
  }, [logic.isSomethingSelected])

  return (
    <Observer>{() => {
      return (
        <tr>
          <th className="rich-table__head__selection-icon">
            <CircleButton onClick={onSelectClick} size={20} style={{
              background: '#6CEBFC',
              cursor: 'pointer',
            }}>
              {logic.isSomethingSelected 
                ? <MinusIcon width={10} height={10} /> 
                : <CheckIcon width={10} height={10} />}
            </CircleButton>
          </th>
          {children}
          <th></th>
        </tr>
      )
    }}</Observer>
  )
}