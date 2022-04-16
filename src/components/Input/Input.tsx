import React, { useCallback } from "react"

interface IInputProps {
    value: string;
    onChange: (value: string) => void;
    inputProps?: React.HTMLProps<HTMLInputElement>;
}

export const Input = ({value, onChange, inputProps}: IInputProps) => {
    const onChangeCb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }, [onChange])

    return <input value={value} onChange={onChangeCb} {...inputProps}/>
}