<script lang="ts" setup>
import { ElMessage } from 'element-plus';
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
  tableData.value = res.data
}

// 选择
const multipleSelection = ref([])
// 选择函数
const handleSelectionChange = (selection: any,) => {
  multipleSelection.value = selection
}
const handleSelectAll = (selection: any) => {
  multipleSelection.value = selection
}

// 保存功能
const saveInfo = async () => {
  console.log("saveorderinfo", multipleSelection.value);
  if (multipleSelection.value.length == 0) {
    ElMessage({
      message: '至少选择一个保存,可全选',
      type: 'warning',
    })
  } else {
    await infoApi.update(multipleSelection.value)
  }

}

// 生成Excel
const createExcel = async () => {
  console.log("saveorderinfo", multipleSelection.value);
  if (multipleSelection.value.length == 0) {
    ElMessage({
      message: '至少选择一个生成表格,可全选',
      type: 'warning',
    })
  } else {
    await infoApi.excel(multipleSelection.value)
  }
}
</script>
<template>
  <el-table :data="tableData" style="width: 100%" height="800" :border="true" @select="handleSelectionChange"
    @select-all="handleSelectAll">
    <el-table-column type="selection" />
    <el-table-column prop="orderId" label="订单号" width="150" v-show="false" />
    <el-table-column prop="orderName" label="订单名" width="120" />
    <el-table-column prop="commodityId" label="商品号" width="120" />
    <el-table-column prop="commodityName" label="商品名" width="320" />
    <el-table-column prop="unit" label="单位" width="120" />
    <!-- <el-table-column prop="quantity" label="数量" width="120 " /> -->
    <el-table-column label="数量" width="120">
      <template v-slot="scope">
        <el-input v-model="scope.row.quantity" />
      </template>
    </el-table-column>
    <el-table-column prop="price" label="单价" width="120" />
  </el-table>
  <el-button type="success" @click="saveInfo">保存</el-button>
  <el-button type="primary" @click="createExcel">生成表格</el-button>
</template>