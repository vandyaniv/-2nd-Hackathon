import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  {
    languageOptions: { globals: globals.browser },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...globals.node,
];
