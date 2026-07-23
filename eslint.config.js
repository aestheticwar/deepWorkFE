import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import fsdImport from 'eslint-plugin-fsd-import';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const fsdOptions = { alias: '@', rootDir: 'src' };

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/.turbo/**',
    '**/*.tsbuildinfo',
    '**/src/generated/**',
  ]),

  // 1. Базовые правила для JavaScript
  {
    name: '@deep-work/eslint-config/javascript',
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser, // Теперь JS файлы тоже знают про window/document
      },
    },
  },

  // 2. Базовые правила для TypeScript
  {
    name: '@deep-work/eslint-config/typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [
      // js.configs.recommended УБРАН, так как он уже внутри recommendedTypeChecked
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },

  {
    name: '@deep-work/eslint-config/fsd',
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'fsd-import': fsdImport,
    },

    rules: {
      'fsd-import/layer-imports': ['error', fsdOptions],
      'fsd-import/public-api-imports': ['error', fsdOptions],
      'fsd-import/fsd-relative-path': ['error', fsdOptions],
    },
  },

  // 3. Специфичные правила для React (накладываются поверх TS)
  {
    name: '@deep-work/eslint-config/react',
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },
]);
