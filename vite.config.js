import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Proxy our local Stripe server at :4242
  server: {
    proxy: {
      '/create-checkout-session': 'http://localhost:4242'
    }
  },
  plugins: [react()]
});