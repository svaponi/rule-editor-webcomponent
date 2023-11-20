import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';

const NODE_ENV = 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/main.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'build/main.es.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({useTsconfigDeclarationDir: true}),
    css({
      output: 'style.css',
    }),
    copy({
      targets: [{src: 'src/index.html', dest: 'build'}],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
};
