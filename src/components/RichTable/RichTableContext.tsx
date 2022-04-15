import React from "react";

export interface IRichTableContextProps {
  isRowSelected: (row: any) => boolean;
  onRowSelectToggle: (row: any, select: boolean) => void;
  onRowDelete: (row: any) => void;
}

export const RichTableContext = React.createContext<IRichTableContextProps>({
  isRowSelected: () => false,
  onRowSelectToggle: () => undefined,
  onRowDelete: () => undefined,
});
