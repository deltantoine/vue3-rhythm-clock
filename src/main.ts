// app
import { createApp } from 'vue'
import App from '@/App.vue'

// store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// global css
import '@/assets/stylesheets/app.scss'

// create store
const store = createPinia()
store.use(piniaPluginPersistedstate)

// create app
const app = createApp(App)

// mount app
app
  .use(store)
  .mount('#app')
