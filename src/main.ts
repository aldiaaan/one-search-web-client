import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { focusOnMount } from './directives'
import VueApexCharts from "vue3-apexcharts";

async function prepare() {
  // if (import.meta.env.DEV) {
  //   const { default: msw } = await import('./sw/msw')
  //   await msw.start()
  // }
}

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.use(VueApexCharts)

app.directive('focusOnMount', focusOnMount)

prepare().then(() => {
  app.mount('#app')
})
