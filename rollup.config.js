import ts from 'rollup-plugin-ts';
import { defineConfig } from 'rollup';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            format: 'esm',
            file: 'lib/index.js',
        },
        external: ['node:os','cheerio','axios', 'qs'],
        plugins: [
            ts({
                tsconfig: 'tsconfig.json'
            })
        ]
    }
])