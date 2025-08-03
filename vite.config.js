import { defineConfig } from 'vite'
import path from 'path'
export default defineConfig({
  esbuild: {
    jsxFactory: 'MiniDom.createElement',
    jsxFragment: 'Fragment',
    jsxInject: `import { MiniDom } from "@/mini-dom";`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Exemple: @ = src/
    },
  },
})