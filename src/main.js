import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/config/router_index'
import pinia from '@/config/pinia_index'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'



const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(pinia)//安装插件
app.use(ElementPlus)
app.mount('#app')




