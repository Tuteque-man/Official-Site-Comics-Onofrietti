import './assets/main.css'
import './assets/style/global-fixes.css'
import './assets/style/responsive.css'
import './assets/style/footer.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
