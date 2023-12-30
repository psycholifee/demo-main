import { Commodity } from "../types/Commodity.ts";
import HttpRequest from "./index.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/order',
    timeout: 10000,
});
interface OrderDTO {
    customerId: number
    commodities: Commodity[]
}
const orderApi = {

    create: (orderDTO: OrderDTO) => {
        console.log(orderDTO);
        
        return httpRequest.post({ url: '/create', data: orderDTO })
    },


}

export default orderApi;
