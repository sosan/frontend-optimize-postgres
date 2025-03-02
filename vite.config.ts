import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react'
import path from "path";
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    root: path.resolve(__dirname, './web'),
    build: {
        outDir: path.resolve(__dirname, './dist'),
        emptyOutDir: true,
    },
    plugins: [react(), glsl(),
    // {
    //     name: 'copy-worker',
    //     closeBundle() {
    //         const workerPath = resolve(__dirname, '_worker.ts');
    //         const outputPath = resolve(__dirname, 'dist/_worker.js');
    //         copyFileSync(workerPath, outputPath);
    //     }
    // }
    ],
    html: {
        cspNonce: '{SERVER-CSP-NONCE}',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./web"),
        },
    },
})
