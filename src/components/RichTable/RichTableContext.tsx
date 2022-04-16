import React from "react";

export interface IRichTableContextProps {
  isRowSelected: (row: any) => boolean;
  isSomethingSelected: boolean;
  onRowSelectToggle: (row: any, select: boolean) => void;
  onRowDelete: (row: any) => void;
  selectAll: () => void;
  unselectAll: () => void;
}

export const RichTableContext = React.createContext<IRichTableContextProps>({
  isRowSelected: () => false,
  isSomethingSelected: false,
  onRowSelectToggle: () => undefined,
  onRowDelete: () => undefined,
  selectAll: () => undefined,
  unselectAll: () => undefined,
});
