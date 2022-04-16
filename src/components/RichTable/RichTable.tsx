import { observer } from "mobx-react-lite";
import { Table } from "../Table/Table";
import { CellRender } from "../Table/TableBody";
import { IRichTable } from "./IRichTable";
import { RichTableContext } from "./RichTableContext";
import { RichTableHead } from "./RichTableHead";
import { RichTableHeadCell } from "./RichTableHeadCell";
import { RichTableRow } from "./RichTableRow";
import './RichTable.css';

export type SortOrder = 'asc' | 'desc';

export type IRichTableProps = {
  logic: IRichTable<any>; 
  cellRender: CellRender;
}

export const RichTable = observer(({logic, cellRender}: IRichTableProps) => (
  <RichTableContext.Provider value={{
    isRowSelected: logic.isRowSelected,
    isSomethingSelected: logic.isSomethingSelected,
    onRowSelectToggle: logic.onRowSelectToggle,
    onRowDelete: logic.onRowDelete,
    selectAll: logic.selectAll,
    unselectAll: logic.unselectAll,
  }}>
    <Table columns={logic.columns}>
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
