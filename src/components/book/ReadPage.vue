<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useBooksStore } from '../../store/BookStore.js';
import { service } from "@/config/axios_index.js";
import { Edit, DArrowRight, DArrowLeft, Operation } from '@element-plus/icons-vue'

const route = useRoute();
const store = useBooksStore()

let chapterContents = reactive([])
let bookId = 3333;
let chapterId = 1;

// 获取章节内容
async function getChapterContent(bookId, chapterId) {
    await service.get('book/readBook', {
        params: {
            bookId: bookId,
            chapterId: chapterId
        }
    }).then(
        res => {
            if (res.status == 200) {
                console.log("请求章节：chapterId = " + chapterId)

                chapterContents.length = 0;
                let contents = res.data;
                if (contents != null) {
                    contents.forEach(element => {
                        chapterContents.push(element)
                    });
                }

            } else {
                ElMessage.error('获取章节失败！！')
            }
        })
}

function nextChapter() {
    chapterId++;
    getChapterContent(bookId, chapterId);
}

function lastChapter() {
    chapterId--;
    getChapterContent(bookId, chapterId)
}



getChapterContent(bookId, chapterId);

const pageSet = reactive({
    pageSize: 80,
    fontSize: 13,
    lineHeight: 10,
    marginBottom: 10,
})

</script>

<template >
    {{ pageSet }}
    <div class="container" @onshow="getChapterContent">
        <div class="content" :style="{with:pageSet.pageSize + '% !important' }">
            <p v-for="chapterContent in chapterContents" class="paragraph" :style="{
                fontSize: pageSet.fontSize + 'px',
                lineHeight: pageSet.lineHeight + 'px',
                marginBottom: pageSet.marginBottom + 'px'
            }">
                {{ chapterContent }}
            </p>
        </div>
        <div class="affix-menu">
            <el-popover placement="left" title="页面设置" :width="500" trigger="hover">
                <div class="page-set">
                    <el-row>
                        <el-col :span="4">
                            <el-text class="mx-1">页面宽度</el-text>
                        </el-col>
                        <el-col :span="20">
                            <el-slider v-model="pageSet.pageSize" />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-text class="mx-1">字体大小</el-text>
                        </el-col>
                        <el-col :span="20">
                            <el-slider v-model="pageSet.fontSize" />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-text class="mx-1">行的间距</el-text>
                        </el-col>
                        <el-col :span="20">
                            <el-slider v-model="pageSet.lineHeight" />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-text class="mx-1">段落间距</el-text>
                        </el-col>
                        <el-col :span="20">
                            <el-slider v-model="pageSet.marginBottom" />
                        </el-col>
                    </el-row>
                </div>
                <template #reference>
                    <el-button type="primary" :icon="Operation" />
                </template>
            </el-popover>

            <el-tooltip content="下一章" placement="left">
                <el-button type="primary" :icon="DArrowRight" @click="nextChapter" />
            </el-tooltip>

            <el-tooltip content="上一章" placement="left">
                <el-button type="primary" :icon="DArrowLeft" @click="lastChapter" />
            </el-tooltip>


        </div>
    </div>
</template>

<style scoped>
.paragraph{
    word-break: break-all;
}
.container {
    display: flex;
    align-items: center;
    gap: 80px;

}

.content {
    background-color: rgba(255, 255, 255, 0.121);
    border-radius: 8px;
    /* width: 80%; */
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
