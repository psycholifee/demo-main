import HttpRequest from "./index.ts";

// 实例化
const httpRequest = new HttpRequest({
    baseURL: 'http://localhost:8888/info',
    timeout: 10000,
});


const infoApi = {

    tree: () => {
        return httpRequest.get({ url: '/tree' })
    },
    dedetails: (orderId: number) => {
        return httpRequest.get({ url: `/details/${orderId}` })
    },
    update: (orderInformationViews: any) => {
        return httpRequest.post({ url: '/update', data: orderInformationViews })
    },
    excel: (orderInformationViews: any) => {
        return httpRequest.post({ url: '/excel', data: orderInformationViews })
    },
}

export default infoApi;
