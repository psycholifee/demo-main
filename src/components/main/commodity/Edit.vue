<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item v-show="false" label="ID :" prop="id">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="产品名称：" prop="name" clearable style="width: 450px" :rules="[
      { required: true, message: '名称必填' }
    ]">
      <el-input v-model="ruleForm.name" />
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
        提 交
      </el-button>
      <el-button type="warning" @click="closeFrom">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { ElMessage, type FormInstance } from 'element-plus';
import { inject, ref, toRaw } from 'vue';
import { Commodity } from '../../../types/Commodity';
import commodityApi from '../../../api/commodity';
interface RuleForm {
  id?: number,
  name: string,
  specification: string,
  unit: string,
  price?: number,
  remark: string,
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RuleForm>({
  id: undefined,
  name: '',
  specification: '',
  price: undefined,
  remark: '',
  unit: ''
})

const editData: any = inject('editCommodity')
const trueEditData = toRaw(editData.data)
ruleForm.value = trueEditData

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("submitForm");
  console.log(ruleForm.value.id);
  const updateData: Commodity = {
    id: ruleForm.value.id,
    name: ruleForm.value.name,
    specification: ruleForm.value.specification,
    unit: ruleForm.value.unit,
    price: ruleForm.value.price,
    remark: ruleForm.value.remark,
  }

  if (!formEl) return
  await formEl.validate(async (flag) => {
    if (flag) {
      // 编辑请求 api
      const res = await commodityApi.update(updateData)
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
  setTimeout(() => {
    location.reload()
  }, 500);


}
const emit = defineEmits(["afterEdit"])
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const closeFrom = () => {
  console.log(11111);
  resetForm
  location.reload()
}

</script>
