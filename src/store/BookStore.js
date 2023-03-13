import { defineStore } from "pinia";
import { ref, reactive, toRef } from 'vue'
import { service } from '@/config/axios_index'
import { useRouter } from 'vue-router';

export const useBooksStore = defineStore('books', () => {
  const router = useRouter()

  let booksOnBookSelf = ref([])
  let searchResults = ref([])
  let currentBook = ref({})

  // 搜索书籍
  async function searchBooks(searchKey) {
    searchResults.length = 0;
    await service.get('book/searchBook', {
      params: {
        searchKey: searchKey
      }
    }).then(
      res => {
        if (res.status == 200) {
          let bookIds = res.data
          bookIds.forEach(bookId => {
            console.log(bookId)
            getBookInfo(bookId);

          });

        } else {
          ElMessage.error('搜索书籍失败！！')
        }
      })
  }

  // 获取书籍的信息
  async function getBookInfo(bookId) {
    await service.get('book/getBookInfo', {
      params: {
        bookId: bookId
      }
    }).then(
      res => {
        if (res.status == 200) {
          let book = res.data;
          console.log(book)
          searchResults.push(book)
        } else {
          ElMessage.error('查询书籍信息失败！！')
        }
      })
  }

  // 阅读书籍的内容
  function readBook(book){
    currentBook.value = book;
    router.push({name:'ReadPage'})
  }

  return { searchResults, currentBook, searchBooks,readBook }

}, {
  persist: {
    enable:true,
      storage: sessionStorage,
      debug:true,
  }
}
)