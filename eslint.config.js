import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // General JavaScript best practices
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'consistent-return': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // React/Preact rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'jsx-quotes': ['error', 'prefer-double'],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // prettier (disables conflicting ESLint rules)
      ...prettierConfig.rules,
    },
  },
  // Backend-specific overrides
  {
    files: ['apps/backend/**/*.ts'],
    languageOptions: { globals: { node: true, browser: false } },
    rules: {
      'no-console': 'off',
      'no-process-exit': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },
  // Frontend-specific overrides
  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    languageOptions: { globals: { browser: true, node: false } },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
];
