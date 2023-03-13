<!--
 * @Author: 木云蜗
 * @Description: 主页
-->
<script setup>
import {useDemoStore} from '@/store/DemoStore.js'
import { ref, reactive, toRaw ,toRef} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Demo from '@/components/main/Demo.vue'
import { SortUp } from '@element-plus/icons-vue';
const router = useRouter();
const store = useDemoStore();

function demo(){
    console.log(store.c.push(2));
    store.c.push(1)
}

</script>

<template>
    主页
    <el-divider></el-divider>
    <button @click="store.a++">{{ store.a }}</button><br/>
    <button @click="store.b.push(1)">{{ store.b }}</button><br/>
    <button @click="demo">{{ store.c }}</button><br/>
</template>

<style scoped></style>
