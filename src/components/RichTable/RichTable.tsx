import { observer } from "mobx-react-lite";
import './RichTable.css';
import { Table } from "../Table/Table";
import { CellRender } from "../Table/TableBody";
import { IRichTable } from "./IRichTable";
import { RichTableContext } from "./RichTableContext";
import { RichTableHead } from "./RichTableHead";
import { RichTableHeadCell } from "./RichTableHeadCell";
import { RichTableRow } from "./RichTableRow";
import { ITableCol } from "../Table/TableHead";

export type SortOrder = 'asc' | 'desc';

export type IRichTableProps = {
  logic: IRichTable<any>; 
  columns: ITableCol[];
  cellRender: CellRender;
}

export const RichTable = observer(({logic, columns, cellRender}: IRichTableProps) => (
  <RichTableContext.Provider value={{
    isRowSelected: logic.isRowSelected,
    isSomethingSelected: logic.isSomethingSelected,
    onRowSelectToggle: logic.onRowSelectToggle,
    onRowDelete: logic.onRowDelete,
    onRowUpdate: logic.onRowUpdate,
    selectAll: logic.selectAll,
    unselectAll: logic.unselectAll,
  }}>
    <Table columns={columns}>
      <Table.Head
        renderHead={RichTableHead}
        renderHeadCell={RichTableHeadCell}
      />
      <Table.Body 
        rows={logic.rows}
        rowIdGetter={logic.rowIdGetter}
        renderCell={cellRender}
        renderRow={RichTableRow}
      />
    </Table>
  </RichTableContext.Provider>
))
