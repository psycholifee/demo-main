import { Commodity } from "../types/Commodity.ts";
import HttpRequest from "./index.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/order',
    timeout: 10000,
});
interface OrderDTO {
    customerId: number
    orderId?: number
    orderName?: string | any
    commodities: Commodity[]
}
const orderApi = {

    names: () => {
        return httpRequest.get({ url: '/name' })
    },
    query: (customerId: number) => {
        return httpRequest.get({ url: `/query?customerId=${customerId}` })
    },
    create: (orderDTO: OrderDTO) => {
        console.log("create orderDTO", orderDTO);

        return httpRequest.post({ url: '/create', data: orderDTO })
    },
    update: (orderDTO: OrderDTO) => {
        console.log("update orderDTO", orderDTO);
        return httpRequest.post({ url: '/update', data: orderDTO })
    }


}

export default orderApi;
