<template>
  <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
    :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import infoApi from '../../../api/info';
onMounted(() => {
  getInfo()

})
// 获取后端数据并处理
const getInfo = async () => {
  // 获取
  const trees = (await infoApi.tree()).data
  data.value = trees
  // 处理
}





const handleNodeClick = () => {

  console.log(1);
  console.log(data);



}
const data = ref([
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])


const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>