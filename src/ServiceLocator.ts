import * as uuid from "uuid";
import { FakeOrdersApi } from "./api/FakeOrdersApi";
import { IOrder } from "./models/OrderModel";

const orders: IOrder[] = [
  { 
    id: uuid.v4(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: uuid.v4(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: uuid.v4(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: uuid.v4(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
];

const ordersMap: Map<string, IOrder> = orders.reduce((map, order) => {
  map.set(order.id!, order);
  return map;
}, new Map())

export const ordersApi = new FakeOrdersApi(ordersMap);