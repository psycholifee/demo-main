<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item label="产品名称：" prop="name" clearable style="width: 450px" :rules="[
      { required: true, message: '名称必填' }
    ]">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="类型：" prop="type">
      <el-select v-model="ruleForm.type" placeholder="选择类型">
        <el-option label="类型1" value="t1" />
        <el-option label="类型2" value="t2" />
      </el-select>
    </el-form-item>
    <el-form-item label="规格" prop="specification" clearable style="width: 450px">
      <el-input v-model="ruleForm.specification" />
    </el-form-item>
    <el-form-item label="单位" prop="unit" clearable style="width: 200px">
      <el-input v-model="ruleForm.unit" />
    </el-form-item>
    <el-form-item label="单价" prop="price" clearable style="width: 200px">
      <el-input v-model="ruleForm.price" />
    </el-form-item>
    <el-form-item label="备注：" prop="remark" clearable style="width: 450px">
      <el-input v-model="ruleForm.remark" type="textarea" rows="4" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        创 建
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import commodityApi from '../../../api/commodity';
interface RuleForm {
  name: string,
  type: string,
  specification: string,
  unit: string,
  price: number,
  remark: string,
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  type: '',
  specification: '',
  price: 0,
  remark: '',
  unit: ''
})

// 创建成功触发的事件
const emit = defineEmits(["afterCreate"])

const submitForm = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate(async (flag) => {
    if (flag) {
      // 新增请求 api
      const res = await commodityApi.add(ruleForm)
      // 触发成功事件
      emit("afterCreate", ruleForm)
      // 成功消息弹出
      ElMessage({
        message: res.msg,
        type: 'success',
      })
    } else {
      ElMessage({
        message: '相关参数错误，请检查',
        type: 'warning',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>