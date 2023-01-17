/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: isProd ? 'hidden' : true
  },
  plugins: [
    vuePlugin(),
    eslintPlugin({
      cache: false
    })
  ],
  server: {
    host: '0.0.0.0',
    open: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [
      './test/setup_files/add_jest_to_global.ts'
    ]
  }
})
