<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import infoApi from '../../../api/info';
// 获取列表数据
const id = inject('id')
const orderId = ref(id);
const tableData = ref([])
watch(() => orderId.value, (newValue) => {
  // 当搜索关键词变化时触发过滤逻辑
  console.log("newValue", newValue);
  getOrderInfo(newValue)
});
const getOrderInfo = async (orderId: any) => {
  const res = await infoApi.dedetails(orderId)
  console.log(res.data);
  console.log(tableData);
  tableData.value = res.data
}


</script>
<template>
  <el-table :data="tableData" style="width: 100%" height="800" :border="true">
    <!-- <el-table-column fixed prop="orderId" label="订单号" width="150" /> -->
    <el-table-column type="selection" />
    <el-table-column prop="orderId" label="订单号" width="150" />
    <el-table-column prop="orderName" label="订单名" width="120" />
    <el-table-column prop="commodityId" label="商品号" width="120" />
    <el-table-column prop="commodityName" label="商品名" width="320" />
    <el-table-column prop="unit" label="单位" width="120" />
    <el-table-column prop="quantity" label="数量" width="120" />
    <!-- <el-table-column label="数量" width="120">
      <template #default="scope">
        <input type="text" :value="scope.row.quantity" />
      </template>
    </el-table-column> -->
    <el-table-column prop="price" label="单价" width="120" />
  </el-table>
</template>