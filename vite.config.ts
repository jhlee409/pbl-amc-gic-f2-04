import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://hokwescexyufkisxulqe.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva3dlc2NleHl1Zmtpc3h1bHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjIxNjAsImV4cCI6MjA2OTMzODE2MH0.SS9wztt7rOzsGYwDG_ozPKVYctCylvK32RwwmME2t2I'),
  },
});
