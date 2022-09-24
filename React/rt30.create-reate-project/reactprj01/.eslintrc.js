module.exports = {
  /* https://eslint.org/docs/user-guide/configuring/rules
   * https://eslint.org/docs/rules/
   * https://eslint.org/docs/user-guide/configuring/
   */
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  overrides: [],
  globals: {
    _: false,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

    // windows linebreaks when not in production environment
    'linebreak-style': ['warn', 'unix'],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ], //should add ".ts" if typescript project
    // 'jsx-a11y/label-has-associated-control': ['warn', { required: { some: ['nesting', 'id'] } }],
    // 'jsx-a11y/label-has-for': ['warn', { required: { some: ['nesting', 'id'] } }],

    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'arrow-parens': ['warn', 'always'], // () => {}
    'arrow-body-style': ['warn', 'always'],
    'consistent-return': 'off',
    'func-names': 'off',
    'no-shadow': 'off',
    'no-alert': 'off',
    'no-var': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'object-curly-newline': [
      'warn',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'always',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'no-debugger': 1,
    'no-unused-vars': 1,
    'react/prop-types': 1,
    'react/no-unused-prop-types': 1,
  },
};
