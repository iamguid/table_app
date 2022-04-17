import { FakeOrdersApi } from "../api/FakeOrdersApi";
import { AbstractRichTableLogic } from "../components/RichTable/AbstractRichTableLogic";
import { IOrder } from "../models/OrderModel";

export class OrdersTableLogic extends AbstractRichTableLogic<IOrder> {
  private ordersApi: FakeOrdersApi;

  constructor(ordersApi: FakeOrdersApi) {
    super();
    this.ordersApi = ordersApi;
  }

  public reloadAllRows = async (): Promise<void> => {
    const orders = await this.ordersApi.fetchAllOrders();
    this._rawRows = orders;
  }

  public rowDeleteRequest = async (id: number): Promise<void> => {
    await this.ordersApi.deleteOrder(id);
  }

  public rowsDeleteRequest = async (ids: Set<number>): Promise<void> => {
    for (const id of ids) {
      await this.ordersApi.deleteOrder(id);
    }
  }

  public rowUpdateRequest = async (updatedRow: IOrder): Promise<void> => {
    await this.ordersApi.updateOrder(updatedRow);
  }

  public rowIdGetter = (row: IOrder): number => {
      return row.id!;
  }
}