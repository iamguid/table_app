import React from "react";
import { IRichTable } from "./IRichTable";

export interface IRichTableContextProps {
  logic: IRichTable<any> | null;
}

export const RichTableContext = React.createContext<IRichTableContextProps>({
  logic: null,
});
