import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { focusOnMount } from './directives'

async function prepare() {
  if (import.meta.env.DEV) {
    const { default: msw } = await import('./sw/msw')
    await msw.start()
  }
}

const app = createApp(App)

app.use(router)

app.directive('focusOnMount', focusOnMount)

prepare().then(() => {
  app.mount('#app')
})
