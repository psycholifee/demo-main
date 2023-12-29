<template>
    <!-- main -->
    <div>
        <!-- 数据展示 -->
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" width="80" />
            <el-table-column prop="name" label="客户名称" width="120" />
            <el-table-column prop="person" label="联系人" width="120" />
            <el-table-column prop="tel" label="电话" width="300" />
            <el-table-column prop="address" label="地址" width="80" />
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { ElTable } from 'element-plus';
import { ref } from 'vue';
// import { tableData } from '../../api/Customer'
interface Customer {
    id: number,
    name: string,
    person: string,
    tel: string
    address: string,
}

// 模拟数据 后期从api中获取后端传来的数据
const tableData = ref<Customer[]>([
    {
        id: 1,
        name: "客户1",
        person: "联系人1",
        tel: "123456789",
        address: "地址1",
    }, {
        id: 1,
        name: "客户1",
        person: "联系人1",
        tel: "123456789",
        address: "地址1",
    }

])

// 选择
const multipleSelection = ref<Customer[]>([])
// 弹出框
const dialogFormVisible = ref(false)


// 选择函数
const handleSelectionChange = (val: Customer[]) => {
    multipleSelection.value = val
}


// 子组件创建成功的回调函数
const afterCreate = (ruleForm: any) => {
    dialogFormVisible.value = false
    console.log(ruleForm);
    tableData.value.push(ruleForm)

}

</script>



<style lang="less" scoped>
.top {
    display: flex;
    gap: 10px;
}
</style>