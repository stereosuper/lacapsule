module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "trailingComma": "es5",
    "singleQuote": true,
    "tabWidth": 4,
    "bracketSpacing": true,
    "vue/max-attributes-per-line": "off",
    "vue/html-indent": ["error", 4, {
        "alignAttributesVertically": false
    }],
    "vue/html-quotes": ["error", "single"],
    "vue/require-v-for-key": "off"
  }
}
