import ts from 'rollup-plugin-ts';
import { defineConfig } from 'rollup';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            format: 'cjs',
            file: 'lib/index.js',
        },
        external: ['node:os','qs','axios','cheerio','iconv-lite'],
        plugins: [
            ts({
                tsconfig: 'tsconfig.json',
            })
        ]
    }
])