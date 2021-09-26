module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    semi: [
      'error',
      'always'
    ],
    'standard/no-callback-literal': 0,
    'node/no-callback-literal': 'error'
  }
};
