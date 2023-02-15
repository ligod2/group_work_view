/*
 * @Author: 木云蜗
 * @Description: 
 */
/*
 * @Author: 木云蜗
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BookSelf from '../components/book/BookSelf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      name: 'Home',
      path: '/',
      component: Home,
    },
    // 书架
    {
      name: 'BookSelf',
      path: '/BookSelf',
      component: BookSelf
    }
  ],
  strict: true
})

export default router
