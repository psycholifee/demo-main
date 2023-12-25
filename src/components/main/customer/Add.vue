<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item label="客户名称" prop="name" clearable style="width: 450px" :rules="[
      { required: true, message: '客户名称必填' }
    ]">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="联系人" prop="person" clearable style="width: 450px">
      <el-input v-model="ruleForm.person" />
    </el-form-item>
    <el-form-item label="电话" prop="tel" clearable style="width: 450px">
      <el-input v-model="ruleForm.tel" />
    </el-form-item>
    <el-form-item label="地址" prop="address" clearable style="width: 450px">
      <el-input v-model="ruleForm.address" />
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
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
interface RuleForm {
    name: string,
    person:string,
    tel:string
    address:string 
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  person: '',
  tel: "",
  address: '',
})

// 创建成功触发的事件
const emit = defineEmits(["afterCreate"])

const submitForm = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 触发成功事件
      emit("afterCreate", ruleForm)
      // 成功消息弹出
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
      // 清空表单
      // formEl.resetFields()
      
      // 提交的api
      console.log(valid, fields, ruleForm);
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