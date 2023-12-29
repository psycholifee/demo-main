import HttpRequest from "./index.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/customer',
    timeout: 10000,
});

const customerApi = {

    names: () => {
        return httpRequest.get({ url: '/names' })
    },


}

export default customerApi;
