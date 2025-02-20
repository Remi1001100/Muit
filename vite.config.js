import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // /api를 빈 문자열로 대체하여 백엔드 API에 맞게 변경
        secure: false,
        ws: true
      }
    }
  }
})