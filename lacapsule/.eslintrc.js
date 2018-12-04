module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:prettier/recommended"
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        "trailingComma": "es5",
        "singleQuote": true,
        "tabWidth": 4,
        "bracketSpacing": true,
        "arrowParens": "avoid",
        "no-console": "off",
        "vue/max-attributes-per-line": "off",
        "no-unused-vars": 1
    }
}
