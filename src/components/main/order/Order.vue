<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="data" show-checkbox node-key="id" :props="defaultProps" @node-click="handleNodeClick" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import infoApi from '../../../api/info';
onMounted(() => {
  getInfo()

})
// 获取后端数据
const getInfo = async () => {
  const trees = (await infoApi.tree()).data
  data.value = trees
}
const data = ref([])
const handleNodeClick = (node: any) => {
  if (!node.hasOwnProperty('children')) { console.log(node); }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>