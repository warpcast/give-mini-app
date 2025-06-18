import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'myanmar-relief': path.resolve(__dirname, 'causes/myanmar-relief.html'),
        'defend-roman-storm': path.resolve(__dirname, 'causes/defend-roman-storm.html'),
      },
    },
  },
});
