
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/commodity",
        component: () => import("../components/main/commodity/Commodity.vue"),
    },
    {
        path: "/customer",
        component: () => import("../components/main/customer/Customer.vue"),
    },
    {
        path: "/order",
        component: () => import("../components/main/order/Order.vue"),
    },

];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

