import HttpRequest from "./index.ts";
import { Commodity } from "../types/Commodity.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/commodity',
    timeout: 10000,
});

const commodityApi = {

    list: () => {
        return httpRequest.get({ url: '/list' })
    },
    add: (commodity: Commodity) => {
        return httpRequest.post({ url: '/add', data: commodity })
    },
    del: (id: any) => {
        console.log(id);
        httpRequest.get({
            url: `/del/${id}`,
        })
    },
    update: (commodity: Commodity) => {
        return httpRequest.post({ url: '/update', data: commodity })
    },
    query: (param?: any) => {
        return httpRequest.get({ url: `/query?param=${param}` })
    }
}

export default commodityApi;
