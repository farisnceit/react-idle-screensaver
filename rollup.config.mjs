import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';


export default [
  // 1️⃣ JS build (ESM + CJS + UMD)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'ReactIdleScreensaver',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'lucide-react': 'LucideReact',
        },
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      postcss({
        extract: true,   // dist/style.css
        minimize: true,
        sourceMap: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        emitDeclarationOnly: false,
        rootDir: './src',
        exclude: ['node_modules', 'dist', '**/*.test.ts', '**/*.test.tsx'],
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'lucide-react'],
  },

  // 2️⃣ Type definitions build
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
