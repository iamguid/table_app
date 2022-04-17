import * as uuid from "uuid";
import { FakeOrdersApi } from "./api/FakeOrdersApi";
import { nextId } from "./id";
import { IOrder } from "./models/OrderModel";

const orders: IOrder[] = [
  { 
    id: nextId(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: nextId(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: nextId(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
  { 
    id: nextId(), 
    msisdn: '89995101214',
    name: 'Лебедев Владислав Игоревич',
    trpl: 0,
    status: 0,
    date: '10.12.2022',
  },
];

const ordersMap: Map<number, IOrder> = orders.reduce((map, order) => {
  map.set(order.id!, order);
  return map;
}, new Map())

export const ordersApi = new FakeOrdersApi(ordersMap);