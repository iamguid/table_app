import React from "react";
import { ITableCol } from "./TableHead";

export interface ITableContextProps {
  columns: ITableCol[];
}

export const TableContext = React.createContext<ITableContextProps>({
  columns: [],
});