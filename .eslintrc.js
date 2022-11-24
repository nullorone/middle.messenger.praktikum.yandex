module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
      "@typescript-eslint/semi": [1, "always"],
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/indent": [
          "error",
          4,
      ],
      "@typescript-eslint/no-empty-interface": [
          "error",
          {
              "allowSingleExtends": true
          }
      ],
      "@typescript-eslint/no-use-before-define": "off",
      "linebreak-style": [
          "error",
          "unix"
      ],
  }
}
