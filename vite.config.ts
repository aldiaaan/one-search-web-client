import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(), svgLoader()],
    build: {
      assetsDir: `${env.VITE_WEB_CLIENT_STATIC_PREFIX}`
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
