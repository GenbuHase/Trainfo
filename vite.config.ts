import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    // PostCSS のファイルシステム再帰探索（11万ファイル探索）によるハングを防止
    postcss: {
      plugins: [],
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    watch: {
      // 12万ファイルのキャッシュ（scripts/cache）や巨大路線データの監視を除外して起動時ハングを完全防止
      ignored: [
        '**/scripts/**',
        '**/src/data/lines/**',
        '**/dist/**',
        '**/.git/**',
        '**/.yomiyasu/**',
        '**/scratch/**',
      ],
    },
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'leaflet',
      'lucide-react',
    ],
  },
})
