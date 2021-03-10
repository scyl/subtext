module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: ".",
      },
    },
  },
  rules: {
    "import/extensions": "off",
    quotes: ["error", "double"],
    "no-restricted-syntax": ["off", "ForOfStatement"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-use-before-define": ["error", "nofunc"],
    "import/prefer-default-export": "off",
    "no-mixed-operators": "off",
    "@typescript-eslint/explicit-function-return-type": ["error"],
    indent: ["error", 2],
  },
};
