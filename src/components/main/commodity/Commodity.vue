<template>
    <!-- top -->
    <div class="top">
        <el-button type="success" @click="dialogFormVisible = true">新 增</el-button>
        <el-button type="primary" :icon="Search" @click="search">查 询</el-button>
        <br />
        <el-input v-model="queryParams" placeholder="输入查询条件" clearable style="width: 400px;" />
    </div>
    <!-- main -->
    <div>
        <!-- 数据展示 -->
        <el-scrollbar height="650px">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="编号" width="80" />
                <el-table-column prop="name" label="产品名称" width="120" />
                <el-table-column prop="specification" label="规格" width="300" />
                <el-table-column prop="unit" label="单位" width="80" />
                <el-table-column prop="type" label="单价" width="80" />
                <el-table-column prop="remark" label="备注" width="300" />
                <el-table-column fixed="right" label="操作功能" width="120">
                    <template #default="scope">
                        <el-button link type="primary" @click="handleClickEdit(scope.row.id, scope.row)">编 辑</el-button>
                        <el-button link type="danger" @click="handleClickDel(scope.row, scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <br>
        <!-- 分页功能 -->
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <!-- 订单功能 -->
        <div style="margin-top: 20px">
            <el-button @click="afterSelection(multipleSelection)">创 建 订 单</el-button>
        </div>
    </div>

    <!-- 新增按钮触发弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新增">
        <Add @after-create="afterCreate"></Add>
    </el-dialog>
    <!-- 创建订单触发弹窗 -->
    <el-dialog v-model="oderDialog" title="创建订单">
        选择客户: &nbsp;&nbsp;<el-select v-model="value" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in customers" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <br><br>
        <el-button type="success">确 认</el-button>
        <el-button type="danger">取 消</el-button>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElTable } from 'element-plus';
import { onMounted, provide, ref } from 'vue';
import commodityApi from '../../../api/commodity';
import { Commodity } from "../../../types/Commodity";
import Add from './Add.vue';
const value = ref('')
// 生命周期
onMounted(() => {
    getTableData()
})
// 数据
const tableData = ref<Commodity[]>([])

// 获取商品列表 api
async function getTableData() {
    // const data: any = await getList()
    const res: any = await commodityApi.list()
    tableData.value = res.data
}


const customers = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
// 查询参数
const queryParams = ref('')
// 选择
const multipleSelection = ref<Commodity[]>([])
// 弹出框
const dialogFormVisible = ref(false)
const oderDialog = ref(false)

// 分页
const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 查询
const search = () => {
    console.log(queryParams);
}


// 编辑按钮
const handleClickEdit = (id: number, row: Commodity) => {

    console.log('edit')
    console.log(id, row);
    params.value.data = row
    params.value.flag = "edit"
    dialogFormVisible.value = true

}

const params = ref({
    flag: "",
    data: {}
})
provide('editCommodity', params)
// 删除按钮
const handleClickDel = (id: number, row: Commodity) => {
    commodityApi.del(row.id)
    console.log("del id, row", id, row);
    // tableData.value.splice(index, 1)
    location.reload()

}

// 选择函数
const handleSelectionChange = (val: Commodity[]) => {
    multipleSelection.value = val
}
const afterSelection = (rows: Commodity[]) => {
    if (rows.length == 0) {
        ElMessage({
            message: '请选择产品',
            type: 'warning',
        })
    } else {
        oderDialog.value = true
        console.log(rows.length);
        rows.forEach(row => {
            console.log(row);
        });
    }

}
// 分页函数
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
// 子组件创建成功的回调函数
const afterCreate = (ruleForm: any) => {
    dialogFormVisible.value = false
    console.log(ruleForm);
    // 刷新页面
    location.reload()
}

</script>



<style lang="less" scoped>
.top {
    display: flex;
    gap: 10px;
}
</style>