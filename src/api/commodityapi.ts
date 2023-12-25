import HttpRequest from "./index.ts";

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
