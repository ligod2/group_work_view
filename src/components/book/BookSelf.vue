<!--
 * @Author: 木云蜗
 * @Description: 一个书架页面
-->
<script setup>



import { reactive, ref } from 'vue'
import { service } from "../../apis/index";


let searchKey = ref('');
let searchResults = ref([]);

async function searchBook(searchKey) {
    await service.get('user/findAllUsers').then(
        res => {
            if (res.status == 200) {
                searchResults.value = res.data;
            } else {
                ElMessage.error('连接错误！！')
            }
        })
}


</script>

<template>
    <Search />
    <div class="search">
        <el-input placeholder="搜索书籍" prefix-icon="Search" v-model="searchKey" clearable />
        <el-button @click="searchBook(searchKey)">搜索</el-button>
    </div>
    <li v-for="item in searchResults">
        {{ item }}
</li>
</template>

<style scoped>
.search {
    display: flex;
}
</style>
