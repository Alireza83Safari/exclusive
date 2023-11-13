import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://eshop-bak.iran.liara.run/",
        changeOrigin: true,
        headers: {
          "liara-Proxy-Target": "liara",
        },
      },
    },
  },
  plugins: [react()],
});
