const jest = require('./jest.config.js');

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {},
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.js',
        'webpack.config.js',
        'jest.config.js',
        'jest.setup.ts',
        'tailwind.config.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: jest.testMatch,
      extends: ['plugin:testing-library/react'],
    },
  ],
};
