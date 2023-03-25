import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'

const useHttps = process.argv.some(s => s === '--https')

export default defineConfig(({ mode }) => ({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react(),
    ...(useHttps ? [mkcert()] : []),
  ],
  resolve: {
    alias: {
      'react-qr-hunter': resolve(__dirname, '/lib/index.tsx')
    }
  },
  build: {
    ...mode !== 'demo' && { lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'reactQrHunter',
      fileName: 'react-qr-hunter',
    }},
  }
}))
