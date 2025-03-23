import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    cors: true,
  },
  plugins: [
    react(),
    componentTagger(),
    nodePolyfills(), // Adiciona o plugin de polyfills
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: 'buffer', // Adiciona o alias para o módulo buffer
    },
  },
  optimizeDeps: {
    exclude: ['ccxt', 'http-proxy-agent', 'https-proxy-agent'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: ['buffer'], // Marca o módulo buffer como external
      output: {
        globals: {
          buffer: 'Buffer', // Define o global Buffer
        },
      },
    },
  },
});
