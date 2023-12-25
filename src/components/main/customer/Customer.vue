<template>
    <!-- top -->
    <div class="top">
        <el-button type="success" @click="dialogFormVisible = true">新 增</el-button>
    </div>
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

            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" @click="handleClickEdit(scope.$index, scope.row)">编 辑</el-button>
                    <el-button link type="danger" @click="handleClickDel(scope.$index, scope.row)">删 除</el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>


    <!-- 新增按钮触发弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新增">
        <Add @after-create="afterCreate"></Add>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import Add from './Add.vue';
import { ref } from 'vue'
import { ElTable } from 'element-plus'
// import { tableData } from '../../api/Customer'
interface Customer {
    id: number,
    name: string,
    person:string,
    tel:string
    address:string ,
}

// 模拟数据 后期从api中获取后端传来的数据
const tableData = ref<Customer[]>([
    {
        id: 1,
        name: "客户1",
        person:"联系人1",
        tel:"123456789",
        address:"地址1" ,
} ,   {
        id: 1,
        name: "客户1",
        person:"联系人1",
        tel:"123456789",
        address:"地址1" ,
}

])

// 选择
const multipleSelection = ref<Customer[]>([])
// 弹出框
const dialogFormVisible = ref(false)


// 编辑按钮
const handleClickEdit = (index: number, row: Customer) => {
    console.log('Edit')
    console.log(index, row);
}
// 删除按钮
const handleClickDel = (index: number, row: Customer) => {
    console.log('Del')
    console.log(index, row);
    tableData.value.splice(index, 1)

}

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