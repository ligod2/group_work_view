<script setup>
import TabList from './components/main/TabList.vue';
import { useRouter, RouterView } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
let asideWidth = ref(0);
function navigate(str) {
  router.push({ name: str })
  console.log(str);
}

function asideShow(event) {
  if (event.screenX <= 10) {
    asideWidth.value = 200;
  }
  else if (event.screenX > 200) {
    asideWidth.value = 0;
  }
}

</script>
<template>
  <div @mousemove="asideShow" class="el-container">
    <el-container class="el-container" >
      <el-aside class="el-aside">
        <TabList @some-event="navigate" />
      </el-aside>

      <el-container class="el-container">
        <el-header class="head">
          <el-page-header>
            <template #content>
              <div class="flex items-center">
                <span class="text-large font-600 mr-3"> 远程LED控制中心 </span>
              </div>
            </template>
            <template #extra>
              <div class="flex items-center">
                <!-- <el-button>Print</el-button> -->
              </div>
            </template>
          </el-page-header>
        </el-header>
        <el-main class="el-main">
          <RouterView @go-page="navigate"></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.el-main {
  padding: 10px;
  height: 100%;
}

.el-aside {
  width: v-bind("asideWidth + 'px'");
  transition: width 0.3s ease;
}

.head{
  background-color: var(--el-color-primary-light-7);
  padding-top: 8px;
}
.el-container{
  width: 100%;
  height: 100%;
}
</style>