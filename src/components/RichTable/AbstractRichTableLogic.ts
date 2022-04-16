import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { asObservableObject, ObservableObjectAdministration } from "mobx/dist/internal";
import { ITableCol } from "../Table/TableHead";
import { FilterPredicate, IRichTable } from "./IRichTable";
import { SortOrder } from "./RichTable";

interface SortState {
  colId: string;
  sortOrder: SortOrder;
}

export abstract class AbstractRichTableLogic<TRow> implements IRichTable<TRow> {
  public _columns: ITableCol[] = [];
  public _rawRows: TRow[] = [];
  public _selectedRows: Set<string> = new Set();
  public _isInitialDataLoaded: boolean = false;
  public _isDataFetching: boolean = false;
  public _sort: SortState | null = null;
  public _searchText: string = '';
  public _filter: FilterPredicate<TRow> | null = null;

  constructor(cols: ITableCol[]) {
    makeObservable(this, {
      _columns: observable,
      _rawRows: observable,
      _selectedRows: observable,
      _isInitialDataLoaded: observable,
      _isDataFetching: observable,
      _sort: observable,
      _searchText: observable,
      _filter: observable,

      columns: computed,
      rows: computed,
      isInitialDataLoaded: computed,
      isDataFetching: computed,

      sortBy: action.bound,
      filterBy: action.bound,
      searchBy: action.bound,
      onRowSelectToggle: action.bound,
      onRowDelete: action.bound,
      onDeleteSelectedRows: action.bound,
    });

    this._columns = cols;
  }

  public sortBy(colId: string, sortOrder: SortOrder) {
    this._sort = { colId, sortOrder };
  }

  public searchBy(searchText: string) {
    this._searchText = searchText;
  }

  public filterBy(filter: FilterPredicate<TRow>) {
    this._filter = filter;
  }

  public get rows() {
    const comparator = (a: TRow, b: TRow) => {
      if (!this._sort) {
        return 0;
      }

      const aField = (a as any)[this._sort.colId];
      const bField = (b as any)[this._sort.colId];

      if (!aField || !bField) {
        return 0;
      }

      if (this._sort.sortOrder === 'asc') {
        return aField.toString().localCompare(bField.toString())
      }

      if (this._sort.sortOrder === 'desc') {
        return bField.toString().localCompare(aField.toString())
      }
    }

    const searchPredicate = (row: TRow) => {
      for (const field in row) {
        const value = row[field];

        if (value) {
          return (value as any).toString().includes(this._searchText);
        }
      }

      return false;
    }

    const filterPredicate = this._filter || (() => true);

    return this._rawRows
      .filter(searchPredicate)
      .filter(filterPredicate)
      .sort(comparator);
  }

  public onRowSelectToggle(row: TRow, select: boolean): void {
    const rowId = this.rowIdGetter(row);

    if (select) {
      this._selectedRows.add(rowId)
    } else {
      this._selectedRows.delete(rowId)
    }
  }

  public async onRowDelete(row: TRow): Promise<void> {
    const rowId = this.rowIdGetter(row);
    try {
      await this.rowDeleteRequest(rowId)

      this._rawRows = this._rawRows
        .filter(row => this.rowIdGetter(row) !== rowId);
    } catch (error) {
      console.error('Could not delete row', error)
    }
  }

  public async onDeleteSelectedRows(): Promise<void> {
    try {
      await this.rowsDeleteRequest(this._selectedRows);

      this._rawRows = this._rawRows
        .filter(row => this._selectedRows.has(this.rowIdGetter(row)));
    } catch (error) {
      console.error('Could not delete selected rows', error)
    }
  }

  public isRowSelected = (row: TRow): boolean => {
    const rowId = this.rowIdGetter(row);
    return this._selectedRows.has(rowId);
  }

  public get columns() {
    return this._columns;
  }

  public get isInitialDataLoaded() {
    return this._isInitialDataLoaded;
  }

  public get isDataFetching() {
    return this._isDataFetching;
  }

  abstract reloadAllRows: () => Promise<void>;
  abstract rowIdGetter: (row: TRow) => string;
  abstract rowDeleteRequest: (rowId: string) => Promise<void>;
  abstract rowsDeleteRequest: (rowsIds: Set<string>) => Promise<void>;
}