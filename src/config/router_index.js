/*
 * @Author: 木云蜗
 * @Description: 
 */
/*
 * @Author: 木云蜗
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/main/Home.vue'
import Demo from '@/components/main/Demo.vue'

import BookSelf from '../components/book/BookSelf.vue'
import SearchPage from '../components/book/SearchPage.vue'
import ReadPage from '../components/book/ReadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      name: 'Home',
      path: '/',
      component: ReadPage,
    },
    // 书籍书架页面
    {
      name: 'BookSelf',
      path: '/BookSelf',
      component: BookSelf
    },
    // 书籍搜索页面
    {
      name: 'SearchPage',
      path: '/SearchPage',
      component: SearchPage
    },
    // 书籍阅读界面
    {
      name: 'ReadPage',
      path: '/ReadPage',
      component: ReadPage
    },
    {
      name: 'Demo',
      path: '/Demo',
      component: Demo,
    }
  ],
  strict: true
})

router.beforeEach(async to => {
  if (to.meta.shouldFetch) {
    // name `data` whatever you want
    to.meta.id = await fetchSomething()
  }
})

export default router
