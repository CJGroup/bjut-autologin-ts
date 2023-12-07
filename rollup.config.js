import ts from 'rollup-plugin-ts';
import { defineConfig } from 'rollup';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            format: 'esm',
            file: 'lib/index.mjs',
        },
        external: [],
        plugins: [
            ts({
                tsconfig: {
                    fileName: 'tsconfig.json',
                    hook: (resolvedConfig) => ({...resolvedConfig, declaration: false})
                }
            })
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            format: 'cjs',
            file: 'lib/index.js',
        },
        external: [],
        plugins: [
            ts({
                tsconfig: 'tsconfig.json',
            })
        ]
    }
])