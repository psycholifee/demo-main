<template>
  <el-col :span="100">
    <h5 class="mb-2">自定义字段</h5>
    <el-menu class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <span @click="toCommodity">商品管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span @click="toCustomer">客户管理</span>
      </el-menu-item>
      <el-menu-item index="3" route>
        <el-icon><icon-menu /></el-icon>
        <span @click="toOrder" ro>订单管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>
  
<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { router } from '../router';
const toCustomer = () => {
  router.push({ path: '/customer' })
}
const toCommodity = () => {
  router.push({ path: '/commodity' })
}
const toOrder = () => {
  router.push({ path: '/order' })
}

</script>
  