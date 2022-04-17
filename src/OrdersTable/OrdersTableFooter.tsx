import './OrdersTable.css';

import { observer } from "mobx-react-lite"

interface IOrdersTableFooter {
  totalCount: number;
  selectedCount: number;
  filteredCount: number;
  onDeleteSelected: () => void;
  onUpdateSelected: () => void;
}

export const OrdersTableFooter = observer(({ totalCount, filteredCount, selectedCount, onDeleteSelected, onUpdateSelected }: IOrdersTableFooter) => (
  <div className="orders-tab-container__footer">
    <span className="orders-tab-container__footer__group">Отображено {`${filteredCount} из ${totalCount}`}</span>
    {selectedCount > 0 && (
      <span className="orders-tab-container__footer__group">
        <span className="orders-tab-container__footer__group-item">Выбрано {`${selectedCount} из ${totalCount}`}:</span>
            <span className="orders-tab-container__footer__group-item">
              <a onClick={onDeleteSelected}>Удалить</a>
            </span>
            <span className="orders-tab-container__footer__group-item">
              <a onClick={onUpdateSelected}>Изменить</a>
            </span>
      </span>
    )}
  </div>
))