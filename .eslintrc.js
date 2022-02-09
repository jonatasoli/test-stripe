const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['sort-destructure-keys'],
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'comma-dangle': ['error', 'never'],
    curly: 'error',
    // imports Rules
    'import/no-cycle': ['error', { amd: true, commonjs: true }],
    'import/no-duplicates': ['error'],
    'import/no-named-as-default': ['error'],
    'import/no-named-as-default-member': ['error'],

    // JSDoc Rules
    'jsdoc/check-param-names': 'error',
    'jsdoc/no-undefined-types': ['error', { definedTypes: ['Vue', 'AxiosResponse', 'VuetifyDialog', 'ASTNode'] }],
    'jsdoc/require-description': 'error',
    'jsdoc/require-param-description': ['off'],
    'jsdoc/require-param-name': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-check': ['error', { exemptAsync: false }],
    'jsdoc/require-returns-description': ['off'],
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-throws': 'off',

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': isEnvProduction ? 'error' : 'warn',
    'no-unused-vars': [
      isEnvProduction ? 'error' : 'warn',
      { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],

    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'sort-destructure-keys/sort-destructure-keys': ['error'],
    'sort-imports': isEnvProduction ? 'error' : 'warn',

    // Vue Rules
    'vue/attributes-order': [
      'warn',
      {
        alphabetical: false,
        order: [
          /*
            DEFINITION e.g. 'is', 'v-is'
            LIST_RENDERING e.g. 'v-for item in items'
            CONDITIONALS e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
            RENDER_MODIFIERS e.g. 'v-once', 'v-pre'
            GLOBAL e.g. 'id'
            UNIQUE e.g. 'ref', 'key', 'v-slot', 'slot'
            TWO_WAY_BINDING e.g. 'v-model'
            OTHER_DIRECTIVES e.g. 'v-custom-directive'
            OTHER_ATTR e.g. 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
            EVENTS e.g. '@click="functionCall"', 'v-on="event"'
            CONTENT e.g. 'v-text', 'v-html'
          */
          ['DEFINITION', 'UNIQUE', 'GLOBAL'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          ['LIST_RENDERING', 'RENDER_MODIFIERS', 'CONTENT', 'CONDITIONALS']
        ]
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [],
        registeredComponentsOnly: false
      }
    ],
    'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'never',
          // Prettier self-closes void elements, so let's allow it. The browser ignores it anyway.
          void: 'always'
        }
      }
    ],
    'vue/no-unused-vars': [isEnvProduction ? 'error' : 'warn', { ignorePattern: '^_' }],
    'vue/order-in-components': 'error',
    'vue/prop-name-casing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-type-constructor': 'error',
    'vue/multi-word-component-names': 'off',

    // TypeScript Rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.vue']
      }
    }
  }
}
