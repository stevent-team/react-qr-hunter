import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'

const useHttps = process.argv.some(s => s === '--https')

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: 'lib/**',
    }),
    ...(useHttps ? [mkcert()] : []),
  ],
  resolve: {
    alias: {
      '@stevent-team/react-qr-hunter': resolve(__dirname, '/lib/index.tsx')
    }
  },
  build: {
    ...mode !== 'demo' && {
      lib: {
        entry: resolve(__dirname, 'lib/index.tsx'),
        name: 'react-qr-hunter',
        fileName: 'react-qr-hunter',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    },
  }
}))
