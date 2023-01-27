<script setup>

</script>

<template>
  <el-container class="el-container">
    <el-aside class="el-aside" width="300px">
      aside
    </el-aside>

    <el-main class="el-main">
      main
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
