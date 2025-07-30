import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // This rule forwards any request starting with /api to your AWS API Gateway.
      "/api": {
        target: "https://b7l2hzxwbg.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true, // Necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, "/prod"), // Rewrite /api/rag to /prod/rag
      },
    },
  },
})
