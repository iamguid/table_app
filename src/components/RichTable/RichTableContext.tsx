import React from "react";

export interface IRichTableContextProps {
  isRowSelected: (row: any) => boolean;
  isSomethingSelected: boolean;
  onRowSelectToggle: (row: any, select: boolean) => void;
  onRowDelete: (row: any) => Promise<void>;
  onRowUpdate: (updatedRow: any) => Promise<void>;
  selectAll: () => void;
  unselectAll: () => void;
}

export const RichTableContext = React.createContext<IRichTableContextProps>({
  isRowSelected: () => false,
  isSomethingSelected: false,
  onRowSelectToggle: () => Promise.resolve(),
  onRowDelete: () => Promise.resolve(),
  onRowUpdate: () => Promise.resolve(),
  selectAll: () => undefined,
  unselectAll: () => undefined,
});
