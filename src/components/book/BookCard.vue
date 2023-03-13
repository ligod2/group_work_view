<script>
import defaultBookCover from "@/assets/bookCover.jpg";

const defaultBook = {
    bookSourceId: '',
    booksourceName: '',

    bookId: '',                     //书籍唯一标识
    bookCover: defaultBookCover,    //书籍封面
    bookName: '书籍名称',           //书籍名称
    bookAuthor: '',                 //书籍作者
    bookIntroduction: '',            //书籍简介

        // 阅读信息
    minChapterId:'',        //最小章节Id
    maxChapterId:'',        //最大章节Id
    currentChapterId:'1'    //当前阅读的章节Id
}
</script>

<script setup>
import { useBooksStore } from '../../Store/BookStore'
import { useRouter } from 'vue-router';

const store = useBooksStore()
const props = defineProps({
    book: {
        default: defaultBook
    },
    poperWidth: {
        default: 300
    }
})

const emit = defineEmits(['goPage'])
const router = useRouter();


function goReadPage() {
    console.log(props.book)
    store.currentBook = props.book
    router.push({ name: 'ReadPage' })
}

</script>



<template>
    <el-popover title="书籍简介" :width="poperWidth" trigger="hover" placement="bottom" :content="book.bookIntroduction">
        <template #reference>
            <el-card ref="toRef" v-hover-outside="onHoverOutside"
                :body-style="{ padding: '0px', margin: '3px', height: '100px' }">

                <div style="display: flex;" @click="goReadPage">
                    <el-image class="image" :src="book.bookCover == null ? defaultBook.bookCover : book.bookCover" :fit="fill" />

                    <el-divider class="line" direction="vertical" />

                    <div class="text">
                        <h1 style="font-size: 18px;">{{ book.bookName }}</h1>
                        <p>作者：{{ book.bookAuthor }}</p>
                        <p>书源：{{ book.booksourceName }}</p>
                    </div>
                </div>

            </el-card>
        </template>
    </el-popover>
</template>

<style scoped>
.book_card {
    margin: 10px;
}

.image {
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
}

.line {
    height: 100px;
    margin: 0px 2px;
    width: 2px;
    background-color: white;
}

.text {
    padding: 5px;
    width: 160px;
    background-color: gray;
}
</style>
