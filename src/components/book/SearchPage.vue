<script setup>
import { ref } from 'vue';


import BookCard from '@/components/book/BookCard.vue';
import { useBooksStore } from '@/store/BookStore.js'

const emits = defineEmits(['goPage'])
const store = useBooksStore()


let searchKey = ref('')

</script>

<template>
    <el-row justify="space-between">
        <el-col :span="12">
            <el-input @change='store.searchBooks(searchKey)' placeholder="搜索网络书籍" prefix-icon="Search" v-model="searchKey"
                :clearable="true" />
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="24">
            <el-divider class="line"></el-divider>
        </el-col>
    </el-row>

    <div class="showResults">
        <BookCard v-for="book in store.searchResults" :book="book" :poper-width="280" @click="store.readBook(book)">
        </BookCard>
    </div>
</template>

<style scoped>
.showResults {
    display: flex;
    flex-wrap: wrap;
}
</style>
