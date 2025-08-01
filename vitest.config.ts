import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.test.js', '**/*.test.jsx'],
    exclude: ['node_modules', 'cypress', 'build'],
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/*.config.js',
        'cypress/',
        'build/',
      ],
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      services: path.resolve(__dirname, './src/services'),
      features: path.resolve(__dirname, './src/features'),
      hooks: path.resolve(__dirname, './src/hooks'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      types: path.resolve(__dirname, './src/types'),
      assets: path.resolve(__dirname, './src/assets'),
    },
  },
  define: {
    ENV: true,
  },
})
