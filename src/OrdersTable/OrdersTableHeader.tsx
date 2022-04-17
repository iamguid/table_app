import { observer } from 'mobx-react-lite';
import { Input } from '../components/Input/Input';
import { IRichTable } from '../components/RichTable/IRichTable';
import { IOrder } from '../models/OrderModel';
import './OrdersTable.css';

interface IOrdersTableHeader {
    logic: IRichTable<IOrder>;
}

export const OrdersTableHeader = observer(({logic}: IOrdersTableHeader) => (
  <div className="orders-tab-container__header">
      <h2>Таблица заказов</h2>
      <div className="orders-tab-container__header__search-box">
          <Input value={logic.searchText} onChange={logic.searchBy} />
      </div>
  </div>
))