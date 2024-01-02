<template>
    <!-- top -->
    <div class="top">
        <el-button type="success" @click="dialogFormVisible = true">新 增</el-button>
        <el-button type="primary" :icon="Search" @click="search">查 询</el-button>
        <br />
        <el-input v-model="queryParams" placeholder="输入查询条件" clearable style="width: 400px;" />
        <el-upload ref="uploadRef" class="upload-demo" action="http://localhost:8888/upload/excel" :auto-upload="false">
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>

            <el-button class="ml-3" type="success" @click="submitUpload">
                确认上传
            </el-button>
        </el-upload>
    </div>


    <!-- main -->
    <div>
        <!-- 数据展示 -->
        <el-scrollbar height="650px">
            <el-table :data="filteredData" style="width: 100%" :row-key="getRowKey" @select="handleSelectionChange">
                <el-table-column type="selection" width="55" :reserve-selection="true" />
                <el-table-column prop="id" label="编号" width="80" v-show="false" />
                <el-table-column prop="name" label="产品名称" width="300" />
                <el-table-column prop="specification" label="规格" width="300" />
                <el-table-column prop="unit" label="单位" width="80" />
                <el-table-column prop="price" label="单价" width="80" />
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
            <el-button @click="afterSelection">创 建 订 单</el-button>
        </div>
    </div>

    <!-- 新增按钮触发弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新增">
        <Add @after-create="afterCreate"></Add>
    </el-dialog>
    <!-- 编辑按钮触发弹窗 -->
    <el-dialog v-model="dialogFormVisibleEdit" title="编辑">
        <Edit @after-edit="afterEdit"></Edit>
    </el-dialog>
    <!-- 创建订单触发弹窗 -->
    <el-dialog v-model="oderDialog" title="创建或更新订单">
        选择客户:&nbsp;&nbsp;<el-select v-model="value" class="m-2" placeholder="点击选择客户" size="large">
            <el-option v-for="item in customerNames" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <div>
            订单名称:&nbsp;&nbsp;
            <el-input placeholder="输入创建或更新的订单内容" v-model="inputordername" clearable style="width: 222px;height: 40px;" />
        </div>
        选择订单:&nbsp;&nbsp;<el-select v-model="valueOrder" class="m-2" placeholder="不选择创建新订单" size="large"
            @change="geteloption">
            <el-option v-for="item in orderNames" :key="item.oderId" :label="item.orderName" :value="item.orderName" />
        </el-select>
        <br><br>
        <el-button type="success" @click="createOrder">确 认</el-button>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElTable, UploadInstance } from 'element-plus';
import { computed, onMounted, provide, ref, watch } from 'vue';
import commodityApi from '../../../api/commodity';
import customerApi from '../../../api/customer';
import orderApi from '../../../api/order';
import { Commodity } from "../../../types/Commodity";
import Add from './Add.vue';
import Edit from './Edit.vue';
const value = ref('')
const valueOrder = ref('')
const inputordername = ref('')
const eloptionval = ref('')
// 生命周期
onMounted(() => {
    getTableData()
    getCustomerNameMap()
    // getOrderNameMap()
})
// 数据
const tableData = ref<Commodity[]>([])
// 获取商品列表 api
async function getTableData() {
    // const data: any = await getList()
    const res: any = await commodityApi.list()
    tableData.value = res.data
    // tableData.value.forEach(element => {

    // });
}
// 获取客户名称和id api
const customerNames = new Array;
async function getCustomerNameMap() {
    const res: any = await customerApi.names()
    console.log("获取客户名称和id", res.data);

    res.data.forEach((element: any) => {
        customerNames.push(element)
    });
}
// 获取订单名称 api
const orderNames = new Array;
async function getOrderNameMap() {
    console.log(value.value);

    const res: any = await orderApi.query(parseInt(value.value))
    console.log("params", value.value);

    res.data.forEach((element: any) => {
        orderNames.push(element)
        console.log(element);

    });
}
// 查询参数
const queryParams = ref('')
// 选择的
const multipleSelection = ref<Commodity[]>([])
// 弹出框
const dialogFormVisible = ref(false)
const dialogFormVisibleEdit = ref(false)
const oderDialog = ref(false)
// 分页
const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const getRowKey = (row: any) => {
    return row.id
}
const filteredData = computed(() =>
    tableData.value.filter(item =>
        item.name.toLowerCase().includes(queryParams.value.toLowerCase())
    )
);
watch(() => queryParams.value, (newValue) => {
    // 当搜索关键词变化时触发过滤逻辑
    console.log(newValue);
});
watch(() => value.value, (newValue) => {
    // 当搜索关键词变化时触发过滤逻辑
    console.log(newValue);
    getOrderNameMap()
});
// 
const search = () => {
    return tableData.value.filter(item =>
        item.name.toLowerCase().includes(queryParams.value.toLowerCase())
    );
}

// 编辑参数
const params = ({
    flag: true,
    data: {},
})
// 编辑按钮
const handleClickEdit = (id: number, row: Commodity) => {

    console.log('edit')
    console.log(id, row);
    params.data = row
    dialogFormVisibleEdit.value = true

}
provide('editCommodity', params)
// 删除按钮
const handleClickDel = (id: number, row: Commodity) => {
    commodityApi.del(row.id)
    console.log("del id, row", id, row);
    // tableData.value.splice(index, 1)
    location.reload()

}
// 选择函数
const handleSelectionChange = (selection: any,) => {
    multipleSelection.value = selection
}
const afterSelection = () => {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            message: '请选择产品',
            type: 'warning',
        })
    } else {
        oderDialog.value = true
    }

}
// 创建更新订单 api
const createOrder = async () => {
    const orderDTO = {
        customerId: parseInt(value.value),
        orderId: parseInt(valueOrder.value),
        orderName: "",
        commodities: multipleSelection.value
    }
    if (inputordername.value || eloptionval.value) {
        if (!eloptionval.value) {
            // 创建新订单
            console.log("创建新订单");
            orderDTO.orderName = inputordername.value
            await orderApi.create(orderDTO)
        } else {
            // 更新旧订单
            console.log("更新订单");
            console.log("inputordername:", inputordername);
            orderDTO.orderName = eloptionval.value
            await orderApi.update(orderDTO)
        }
    } else {
        ElMessage
            ({
                message: '输入有误检查', type: 'warning',
            })
    }
}
// 获取el-option的val
const geteloption = (val: any) => {
    console.log("el-option的val", val);
    eloptionval.value = val
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

const afterEdit = (ruleForm: any) => {
    dialogFormVisibleEdit.value = false
    console.log(ruleForm);
    // 刷新页面
    location.reload()
}

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
    uploadRef.value!.submit()
    location.reload()
}
</script>



<style lang="less" scoped>
.top {
    display: flex;
    gap: 10px;
}
</style>