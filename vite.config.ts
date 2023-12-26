import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { tr } from 'element-plus/es/locales.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
