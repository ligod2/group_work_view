<script setup>
import { useDark, useToggle } from '@vueuse/core'

defineEmits(['someEvent'])

const isDark = useDark()




</script>

<template>
    <el-scrollbar>

        <el-menu default-active="0">
            <!-- 主页 -->
            <el-menu-item index="0" @click="$emit('someEvent', 'Home')">主页</el-menu-item>
            <!-- 模板 -->
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <span>模板</span>
                </template>
                <el-menu-item index="1-0" @click="$emit('someEvent', 'BookSelf')">书架</el-menu-item>
            </el-sub-menu>
            <el-switch v-model="isDark" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />


        </el-menu>

    </el-scrollbar>
</template>

<style scoped>

</style>
