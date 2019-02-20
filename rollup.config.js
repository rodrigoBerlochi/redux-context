import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'lib/redux-magic-tree.js',
      format: 'cjs',
      indent: false
    },
    external: [...Object.keys(pkg.peerDependencies || [])],
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/lodash.capitalize/index.js': ['capitalize']
        }
      })
    ]
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: 'es/redux-magic-tree.js',
      format: 'es',
      indent: false
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/lodash.capitalize/index.js': ['capitalize']
        }
      })
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: 'es/redux.mjs',
      format: 'es',
      indent: false
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      resolve({
        jsnext: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      commonjs({
        namedExports: {
          'node_modules/react-is/index.js': [
            'isValidElementType',
            'isContextConsumer'
          ],
          'node_modules/react/index.js': [
            'createContext',
            'Component',
            'PureComponent'
          ],
          'node_modules/lodash.capitalize/index.js': ['capitalize']
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/redux-magic-tree.js',
      format: 'umd',
      name: 'ReduxMagicTree',
      indent: false,
      globals: {
        react: 'React',
        redux: 'Redux'
      }
    },
    plugins: [
      resolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),

      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      commonjs({
        namedExports: {
          'node_modules/react-is/index.js': [
            'isValidElementType',
            'isContextConsumer'
          ],
          'node_modules/react/index.js': [
            'createContext',
            'Component',
            'PureComponent'
          ],
          'node_modules/lodash.capitalize/index.js': ['capitalize']
        }
      })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/redux-magic-tree.min.js',
      format: 'umd',
      name: 'ReduxMagicTree',
      indent: false,
      globals: {
        react: 'React',
        redux: 'Redux'
      }
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({
        jsnext: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      commonjs({
        namedExports: {
          'node_modules/react-is/index.js': [
            'isValidElementType',
            'isContextConsumer'
          ],
          'node_modules/react/index.js': [
            'createContext',
            'Component',
            'PureComponent'
          ],
          'node_modules/lodash.capitalize/index.js': ['capitalize']
        }
      })
    ]
  }
];
