<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useBooksStore } from '@/store/BookStore.js';
import { service } from "@/config/axios_index.js";
import { Edit, DArrowRight, DArrowLeft, Operation } from '@element-plus/icons-vue'

const route = useRoute();
const store = useBooksStore()

let chapterContents = reactive([])


async function getChapterContent() {
    chapterContents.length = 0
    await service.get('book/readBook', {
        params: {
            bookId: store.currentBook.bookId,
            chapterId: 1
        }
    }).then(
        res => {
            if (res.status == 200) {
                let contents = res.data;
                contents.forEach(element => {
                    chapterContents.push(element)
                });
                console.log(chapterContents)
            } else {
                ElMessage.error('获取章节失败！！')
            }
        })
}

function demo() {
    console.log(store.currentBook)
    console.log("bookId = " + store.currentBook.bookId)
    console.log("chapterId = " + store.currentBook.currentChapterId)
}

</script>

<template >
    <div class="container">
        <div class="content">
            <p v-for="chapterContent in chapterContents">
                {{ chapterContent }}
            </p>
        </div>
        <div class="affix-menu">
            <el-popover placement="left" title="Title" :width="300" trigger="hover">
                <div class="page-set">
                    <el-row>
                        <el-col :span="4">
                            <span class="demonstration">字体</span>
                        </el-col>
                        <el-col :span="20">
                            <el-slider v-model="value1" />
                        </el-col>
                    </el-row>
                </div>
                <template #reference>
                    <el-button type="primary" :icon="Operation" />
                </template>
            </el-popover>

            <el-button type="primary" :icon="Operation" />

            <el-button type="primary" :icon="DArrowRight" />
            <el-button type="primary" :icon="DArrowLeft" />


        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    gap: 80px;
}

.content {
    background-color: rgba(255, 255, 255, 0.121);
    border-radius: 8px;
    width: 80%;
    height: 97vh;
    margin: 0px;

}

.affix-menu {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 30px;
    gap: 10px;

    padding: 5px;
    padding-bottom: 7.5px;

    background-color: rgba(15, 193, 220, 0.244);
    border-radius: 8px;
    height: fit-content;
    right: 80px;

}

.el-button+.el-button {
    margin: 0px;
}

.el-button {
    padding: 8px 10px;
}
</style>
