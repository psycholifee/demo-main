import HttpRequest from "./index.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/order',
    timeout: 10000,
});

const orderApi = {

    names: () => {
        return httpRequest.get({ url: '/create' })
    },


}

export default orderApi;
