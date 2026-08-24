import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // 1. Import it

export default defineConfig({
  plugins: [
    tailwindcss(), // 2. Add it here
  ],
});
