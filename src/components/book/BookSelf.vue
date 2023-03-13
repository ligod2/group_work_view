<!--
 * @Author: 木云蜗
 * @Description: 一个书架页面
-->
<script setup>
import { Search} from '@element-plus/icons-vue'

const emit = defineEmits(['goPage'])


function goSearchPage(){
    emit('goPage','SearchPage')
}


</script>

<template>
    <el-row justify="space-between">
        <el-col :span="5" >
            <el-input placeholder="搜索本地书籍" prefix-icon="Search" v-model="searchKey" clearable />            
        </el-col>

        <el-col :span="7.5">
            <el-button type="primary" :icon="Search" circle @click="goSearchPage"/>
        </el-col>
    </el-row>

    <el-col :span="24">
        <el-divider class="line"></el-divider>
    </el-col>
</template>

<style scoped></style>
