<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="data" show-checkbox node-key="id" :props="defaultProps" @node-click="handleNodeClick" />
      </el-aside>
      <el-main>
        <Info v-show="infoshow"></Info>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue';
import infoApi from '../../../api/info';
import Info from './Info.vue';
onMounted(() => {
  getInfo()

})

// 获取后端数据
const getInfo = async () => {
  const trees = (await infoApi.tree()).data
  data.value = trees
}
const data = ref([])
const infoshow = ref(false)

// 给子组件传递信息
const id = ref('');
const handleNodeClick = async (node: any) => {
  if (!node.hasOwnProperty('children')) {
    infoshow.value = true
    id.value = node.id;
  }
}
provide('id', id)

const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>