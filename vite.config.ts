import { defineConfig, loadEnv } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import path from 'path'
import purgecss from 'rollup-plugin-purgecss'
import vue from '@vitejs/plugin-vue'

const RUN_MODES = {
  DEVELOPMENT: 'development'
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))
  // TODO: set the host dynamically
  const host = mode === RUN_MODES.DEVELOPMENT ? 'dev.localhost' : ''

  return defineConfig({
    // Project root directory (where index.html is located).
    root: process.cwd(),

    /**
     * Define the environment variables prefix.
     * When changing this argument you must update the `env.d.ts` and
     * `src/core/config/index.ts` files.
     *
     * @see https://vitejs.dev/config/index.html#envprefix
     */
    envPrefix: 'VITE_',

    // Will be passed to @rollup/plugin-alias as its entries option.
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '~/': `${path.resolve(__dirname, 'src/assets')}/`
      }
    },
    plugins: [
      /**
       * plugin-vue plugin inject vue library and allow sfc files to work (*.vue)
       *
       * @see https://github.com/vitejs/vite/tree/main/packages/plugin-vue
       */
      vue({ include: [/\.vue$/] }),

      /**
       * TODO: add Purge icons doc
       */
      PurgeIcons(),

      /**
       * rollup-plugin-purgecss plugin is responsible of purging css rules
       * that are not used in the bundle
       *
       * @see https://github.com/FullHuman/purgecss/tree/main/packages/rollup-plugin-purgecss
       */
      purgecss({
        content: [`./src/**/*.vue`],
        variables: false,
        safelist: {
          standard: [
            /(autv|lnil|lnir|fas?)/,
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /data-v-.*/
          ]
        },
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        }
      })
    ],
    server: {
      host: host
    }
  })
}
