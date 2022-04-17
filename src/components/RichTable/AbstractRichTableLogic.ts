import { action, computed, runInAction, makeObservable, observable } from "mobx";
import { FilterPredicate, IRichTable } from "./IRichTable";
import { SortOrder } from "./RichTable";

export interface ISortState {
  colId: string;
  sortOrder: SortOrder;
}

export abstract class AbstractRichTableLogic<TRow> implements IRichTable<TRow> {
  public _rawRows: TRow[] = [];
  public _selectedRows: Set<number> = new Set();
  public _isInitialDataLoaded: boolean = false;
  public _isDataFetching: boolean = false;
  public _sortState: ISortState | null = null;
  public _searchText: string = '';
  public _filter: FilterPredicate<TRow> | null = null;

  constructor() {
    makeObservable(this, {
      _rawRows: observable,
      _selectedRows: observable,
      _isInitialDataLoaded: observable,
      _isDataFetching: observable,
      _sortState: observable,
      _searchText: observable,
      _filter: observable,

      rows: computed,
      isInitialDataLoaded: computed,
      isDataFetching: computed,
      isSomethingSelected: computed,
      totalCount: computed,
      filteredCount: computed,
      selectedCount: computed,
      sortState: computed,
      searchText: computed,

      sortBy: action.bound,
      filterBy: action.bound,
      searchBy: action.bound,
      selectAll: action.bound,
      unselectAll: action.bound,
      onRowSelectToggle: action.bound,
      onRowDelete: action.bound,
      onRowUpdate: action.bound,
      onDeleteSelectedRows: action.bound,
    });
  }

  public sortBy(colId: string, sortOrder: SortOrder) {
    this._sortState = { colId, sortOrder };
  }

  public searchBy(searchText: string) {
    this._searchText = searchText;
  }

  public filterBy(filter: FilterPredicate<TRow>) {
    this._filter = filter;
  }

  public get rows() {
    const comparator = (a: TRow, b: TRow) => {
      if (!this._sortState) {
        return 0;
      }

      const aField = (a as any)[this._sortState.colId];
      const bField = (b as any)[this._sortState.colId];

      if (!aField || !bField) {
        return 0;
      }

      if (this._sortState.sortOrder === 'asc') {
        return bField.toString().localeCompare(aField.toString())
      }

      if (this._sortState.sortOrder === 'desc') {
        return aField.toString().localeCompare(bField.toString())
      }
    }

    const searchPredicate = (row: TRow) => {
      if (this._searchText == '') {
        return true;
      }

      for (const field of Object.getOwnPropertyNames(row)) {
        const value = (row as any)[field];

        if (value) {
          const includes = (value as any)
            .toString()
            .toLowerCase()
            .includes(this._searchText.toLowerCase());
          
          if (includes) {
            return true;
          }
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

      this._selectedRows.delete(rowId);
    } catch (error) {
      console.error('Could not delete row', error)
    }
  }

  public async onRowUpdate(updatedRow: TRow): Promise<void> {
    const rowId = this.rowIdGetter(updatedRow);
    try {
      await this.rowUpdateRequest(updatedRow);

      const currentRowIndex = this._rawRows.findIndex(row => this.rowIdGetter(row) === rowId);
      this._rawRows = this._rawRows.map((row, index) => index == currentRowIndex ? updatedRow : row);
    } catch (error) {
      console.error('Could not update row', error)
    }
  }

  public async onDeleteSelectedRows(): Promise<void> {
    try {
      await this.rowsDeleteRequest(this._selectedRows);

      this._rawRows = this._rawRows
        .filter(row => !this._selectedRows.has(this.rowIdGetter(row)));

      this.unselectAll();
    } catch (error) {
      console.error('Could not delete selected rows', error)
    }
  }

  public selectAll(): void {
    this.rows.forEach(row => {
      const rowId = this.rowIdGetter(row);
      this._selectedRows.add(rowId);
    })
  }

  public unselectAll(): void {
    this._selectedRows.clear();
  }

  public isRowSelected = (row: TRow): boolean => {
    const rowId = this.rowIdGetter(row);
    return this._selectedRows.has(rowId);
  }

  public get searchText(): string {
    return this._searchText;
  }

  public get sortState(): ISortState | null {
    return this._sortState;
  }

  public get isInitialDataLoaded() {
    return this._isInitialDataLoaded;
  }

  public get isDataFetching() {
    return this._isDataFetching;
  }

  public get isSomethingSelected() {
    return this._selectedRows.size > 0;
  }

  public get totalCount() {
    return this._rawRows.length;
  }

  public get filteredCount() {
    return this.rows.length;
  }

  public get selectedCount() {
    return this._selectedRows.size;
  }

  abstract reloadAllRows: () => Promise<void>;
  abstract rowIdGetter: (row: TRow) => number;
  abstract rowUpdateRequest: (newRow: TRow) => Promise<void>;
  abstract rowDeleteRequest: (rowId: number) => Promise<void>;
  abstract rowsDeleteRequest: (rowsIds: Set<number>) => Promise<void>;
}