import HttpRequest from "./index.ts";
import { Commodity } from "../types/Commodity.ts";

// 实例化
const httpRequest = new HttpRequest({ baseURL: 'http://localhost:8888/commodity' });


export default function getList() {
    return httpRequest.get({ url: '/getlist' })
        .then(res => {
            return res.data;
        })
        .catch(res => {
            console.log(res.msg);
        });
}
export function add(commodity: Commodity) {
    return httpRequest.post({ url: '/add', data: commodity })

}
