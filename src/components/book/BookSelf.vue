<!--
 * @Author: 木云蜗
 * @Description: 一个书架页面
-->
<script setup>
import { reactive, ref } from 'vue'
import {searchBook} from '../../api/book'

let searchKey = ref('');

</script>

<template>
    <Search />
    <div class="search">
        <el-input placeholder="搜索书籍" prefix-icon="Search" v-model="searchKey" clearable />
        <el-button @click="searchBook(searchKey)">搜索</el-button>
    </div>
    <p>{{ searchKey }}</p>

</template>

<style scoped>
.search{
    display: flex;
}

</style>
