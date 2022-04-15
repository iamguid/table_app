import React, { useCallback } from "react"

interface ISearchProps {
    value: string;
    onChange: (value: string) => void;
    inputProps?: React.HTMLProps<HTMLInputElement>;
}

export const Search = ({value, onChange, inputProps}: ISearchProps) => {
    const onChangeCb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }, [onChange])

    return <input value={value} onChange={onChangeCb} {...inputProps}/>
}