<script setup>
import TabList from './components/main/TabList.vue';
import { useRouter, RouterView } from 'vue-router';

const router = useRouter();



function navigate(str){
  router.push({name:str})
  console.log(str);
}

</script>

<template>
  <el-container class="el-container">
    <el-aside class="el-aside" width="200px">
      <TabList @some-event="navigate"/>
    </el-aside>

    <el-main class="el-main">
      <RouterView @go-page="navigate"></RouterView>
    </el-main>
  </el-container>
</template>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
.el-main{
  padding: 10px;
}
</style>
