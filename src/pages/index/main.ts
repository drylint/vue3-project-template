import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.scss'
import directives from '@/directives'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(Vant)
  .use(directives)
  .mount('#app')
