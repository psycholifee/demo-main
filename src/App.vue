<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Left></Left>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Left from './components/Left.vue';
</script>
<style lang="less" scoped></style>
