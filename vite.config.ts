import { defineConfig } from 'vite';
import path from 'path';

// * Plugins
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig({
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [{
                src: 'src/nuxt.js',
                dest: ''
            }]
        })
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            name: 'HeitoVueComponents',
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: format => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'nuxt'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) return 'style.css';
                    
                    return assetInfo.name || '';
                }
            }
        }
    }
});