import * as uuid from 'uuid';
import { IOrder } from "../models/OrderModel";

export class FakeOrdersApi {
    private orders: Map<string, IOrder> = new Map();

    constructor(orders: Map<string, IOrder>) {
        this.orders = orders;
    }

    public async fetchAllOrders(): Promise<IOrder[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const orders = Array
                    .from(this.orders.values())
                    .map(order => Object.assign({}, order));

                resolve(orders);
            }, 1000)
        })
    }

    public async deleteOrder(id: string): Promise<IOrder> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const order = this.orders.get(id);

                if (!order) {
                    reject()
                }

                this.orders.delete(id);

                const orderCopy = Object.assign({}, order);
                resolve(orderCopy!);
            }, 1000)
        })
    }

    public async updateOrder(order: IOrder): Promise<IOrder> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentOrder = this.orders.get(order.id!);

                if (!currentOrder) {
                    reject()
                }

                const orderCopy = Object.assign({}, order);
                this.orders.set(order.id!, orderCopy);

                resolve(orderCopy!);
            }, 1000)
        })
    }

    public async createOrder(order: IOrder): Promise<IOrder> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentOrder = this.orders.get(order.id!);

                if (currentOrder) {
                    reject()
                }

                const orderCopy = Object.assign({}, order);
                orderCopy.id = uuid.v4();
                this.orders.set(orderCopy.id!, orderCopy);

                resolve(orderCopy!);
            }, 1000)
        })
    }
}