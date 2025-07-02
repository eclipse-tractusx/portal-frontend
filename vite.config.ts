/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  build: {
    outDir: 'build',
    cssMinify: true,
    rollupOptions: {
      external: ['@emotion/react'],
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo?.name?.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType ?? '')) {
            extType = 'img'
          }
          return `static/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
      },
    },
  },
  resolve: {
    conditions: [
      'module',
      'browser',
      process.env.NODE_ENV === 'production' ? 'production' : 'development',
    ],
    alias: {
      src: path.resolve(__dirname, './src'),
      '@cofinity-x/shared-components': path.resolve(
        __dirname,
        'node_modules/@cofinity-x/shared-components'
      ),
    },
  },
  json: {
    stringify: true,
    namedExports: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: '@use "sass:math"; @use "sass:color";',
      },
    },
  },
  server: {
    hmr: true,
  },
})
