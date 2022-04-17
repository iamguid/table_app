import { ISortState } from "./AbstractRichTableLogic";
import { SortOrder } from "./RichTable";

export type FilterPredicate<TRow> = (row: TRow) => boolean;

export interface IRichTable<TRow> {
  rows: TRow[];
  isInitialDataLoaded: boolean;
  isDataFetching: boolean;
  isSomethingSelected: boolean;
  sortState: ISortState | null;
  searchText: string,
  sortBy: (colId: string, sortOrder: SortOrder) => void;
  filterBy: (filter: FilterPredicate<TRow>) => void;
  searchBy: (searchText: string) => void;
  rowIdGetter: (row: TRow) => number;
  isRowSelected: (row: TRow) => boolean;
  selectAll: () => void;
  unselectAll: () => void;
  onRowSelectToggle: (row: TRow, select: boolean) => void;
  onRowDelete: (row: TRow) => Promise<void>;
  onRowUpdate: (updatedRow: TRow) => Promise<void>;
  onDeleteSelectedRows: () => Promise<void>;
  reloadAllRows: () => Promise<void>;
}
