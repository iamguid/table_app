import { Table } from "../Table/Table";
import { CellRender } from "../Table/TableBody";
import { ITableCol } from "../Table/TableHead";
import { RichTableContext } from "./RichTableContext";
import { RichTableHead } from "./RichTableHead";
import { RichTableHeadCell } from "./RichTableHeadCell";
import { RichTableRow } from "./RichTableRow";

export interface IRichTableProps {
  columns: ITableCol[];
  rows: any[];
  cellRender: CellRender;
  rowIdGetter: (row: any) => string;
  isRowSelected: (row: any) => boolean;
  onRowSelectToggle: (row: any, select: boolean) => void;
  onRowDelete: (row: any) => void;
}

export const RichTable = ({
  columns,
  rows,
  cellRender,
  rowIdGetter,
  isRowSelected,
  onRowSelectToggle,
  onRowDelete,
}: IRichTableProps) => {
  return (
    <RichTableContext.Provider value={{isRowSelected, onRowSelectToggle, onRowDelete}}>
      <Table columns={columns}>
        <Table.Head
          renderHead={RichTableHead}
          renderHeadCell={RichTableHeadCell}
        />
        <Table.Body 
          rows={rows}
          rowIdGetter={rowIdGetter}
          renderCell={cellRender}
          renderRow={RichTableRow}
        />
      </Table>
    </RichTableContext.Provider>
  );
}
