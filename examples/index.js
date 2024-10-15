import { createApp } from 'vue'
import App from './app.vue'
import TestUI from '@test-ui/components'
import "@test-ui/theme-chalk/index.less"; // 引入样式文件

const app = createApp(App)
app.use(TestUI)
app.mount('#app')