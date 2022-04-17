import { createRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { EditIcon } from "../../Icons/icons/EditIcon";
import { UndoIcon } from "../../Icons/icons/UndoIcon";
import { Input } from "../../Input/Input";
import { RichTableEditableCellDataRender } from "../RichTableEditableCell";

export const EditString: RichTableEditableCellDataRender = ({
  row,
  colIndex,
  columns,
  onEditComplete,
}) => {
  const column = columns[colIndex];
  const data = row[column.id];

  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data])

  const inputRef = useRef(createRef<HTMLInputElement>());

  const saveDataCb = useCallback((save: boolean) => {
    if (save && data !== value) {
      onEditComplete(value);
    } else {
      onEditComplete();
      setValue(data);
    }
  }, [data, value])

  const onBlurCb = useCallback(() => {
    saveDataCb(false);
  }, [saveDataCb])

  const onKeyUpCb = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      saveDataCb(false);
    }

    if (e.key === 'Enter') {
      saveDataCb(true);
    }
  }, [saveDataCb])

  useLayoutEffect(() => {
    const input = inputRef.current.current;
    input?.addEventListener('blur', onBlurCb);
    input?.addEventListener('keyup', onKeyUpCb);
    return () => {
      input?.removeEventListener('blur', onBlurCb)
      input?.removeEventListener('keyup', onKeyUpCb);
    }
  })

  return (
    <div>
      <Input 
        value={value}
        onChange={setValue}
        inputProps={{
          autoFocus: true,
          ref: inputRef.current,
          className: 'rich-table__edit-component'
        }} 
      />
      <UndoIcon width={15} height={15}/>
    </div>
  )
}