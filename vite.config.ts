import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },

  build: {
    copyPublicDir: true, // ✅ Copies service-worker.js and manifest.json to dist
    outDir: "dist",
    assetsDir: "assets",
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Ensure proper MIME types for PWA files
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
}));