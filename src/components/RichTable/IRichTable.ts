import { ITableCol } from "../Table/TableHead";
import { SortOrder } from "./RichTable";

export type FilterPredicate<TRow> = (row: TRow) => boolean;

export interface IRichTable<TRow> {
  columns: ITableCol[];
  rows: TRow[];
  isInitialDataLoaded: boolean;
  isDataFetching: boolean;
  sortBy: (colId: string, sortOrder: SortOrder) => void;
  filterBy: (filter: FilterPredicate<TRow>) => void;
  searchBy: (searchText: string) => void;
  rowIdGetter: (row: TRow) => string;
  isRowSelected: (row: TRow) => boolean;
  onRowSelectToggle: (row: TRow, select: boolean) => void;
  onRowDelete: (row: TRow) => Promise<void>;
  onDeleteSelectedRows: () => Promise<void>;
  reloadAllRows: () => Promise<void>;
}
