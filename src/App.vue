<!--
 * @Author: 木云蜗
 * @Description: 应用
-->

<script setup>
import TabList from './components/TabList.vue';
import { useRouter, RouterView } from 'vue-router';

const router = useRouter();



function navigate(str){
  router.push({name:str})
  console.log(str);
}

</script>

<template>
  <el-container class="el-container">
    <el-aside class="el-aside" width="300px">
      <TabList @some-event="navigate"/>
    </el-aside>

    <el-main class="el-main">
      <RouterView></RouterView>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container{
  width: 100%;
  height: 100%;
  background-color: rgb(18, 74, 74);
}

.el-aside{
  background-color: rgb(32, 48, 48);
}
.el-main{
  background-color: rgb(30, 97, 97);
  padding: 0;
}
</style>
