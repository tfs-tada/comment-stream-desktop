import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["electron", "path", "fs"], // 外部モジュールを指定
    },
  },
});
