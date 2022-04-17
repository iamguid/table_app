import { nextId } from "../id";
import { IOrder } from "../models/OrderModel";

export class FakeOrdersApi {
    private orders: Map<number, IOrder> = new Map();

    constructor(orders: Map<number, IOrder>) {
        this.orders = orders;
    }

    public async fetchAllOrders(): Promise<IOrder[]> {
        console.info('[API: fetchAllOrders] request')

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const orders = Array
                    .from(this.orders.values())
                    .map(order => Object.assign({}, order));

                resolve(orders);

                console.info('[API: fetchAllOrders] response', orders)
            }, 1000)
        })
    }

    public async deleteOrder(id: number): Promise<IOrder> {
        console.info('[API: deleteOrder] request', id)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const order = this.orders.get(id);

                if (!order) {
                    reject()
                }

                this.orders.delete(id);

                const orderCopy = Object.assign({}, order);
                resolve(orderCopy!);

                console.info('[API: deleteOrder] response', orderCopy)
            }, 1000)
        })
    }

    public async updateOrder(order: IOrder): Promise<IOrder> {
        console.info('[API: updateOrder] request', order)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentOrder = this.orders.get(order.id!);

                if (!currentOrder) {
                    reject()
                }

                const orderCopy = Object.assign({}, order);
                this.orders.set(order.id!, orderCopy);

                resolve(orderCopy!);

                console.info('[API: updateOrder] response', orderCopy)
            }, 1000)
        })
    }

    public async createOrder(order: IOrder): Promise<IOrder> {
        console.info('[API: updateOrder] request', order);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentOrder = this.orders.get(order.id!);

                if (currentOrder) {
                    reject()
                }

                const orderCopy = Object.assign({}, order);
                orderCopy.id = nextId();
                this.orders.set(orderCopy.id!, orderCopy);

                resolve(orderCopy!);
                console.info('[API: updateOrder] response', orderCopy);
            }, 1000)
        })
    }
}