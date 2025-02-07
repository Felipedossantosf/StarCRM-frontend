import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react"; // React en su propio chunk
            if (id.includes("recharts")) return "recharts"; // lodash en su propio chunk
            if (id.includes("@react-pdf")) return "@react-pdf"; // moment.js en su propio chunk
            if (id.includes("@leaflet-src.js")) return "@leaflet-src.js"; // moment.js en su propio chunk
            return "vendor";
          }
        },
      },
    },
  },
  plugins: [
    react(),
    visualizer({
      filename: "stats.html", // Nombre correcto del archivo
      template: "treemap", // Usa el formato visual de árbol
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
