module.exports = {
  extends: [
    'eslint:all',
    'plugin:github/recommended',
    'plugin:github/internal',
    'plugin:github/typescript',
  ],
  plugins: ['sort-keys-fix'],
  settings:{
    'import/ignore': ['node_modules'],
  },
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'sort-keys-fix/sort-keys-fix': 2,
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "node:*",
            "group": "builtin"
          },
          {
            "pattern": "@packages/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@app/**",
            "group": "internal"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    'object-curly-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    // Clean plugins rules
    'i18n-text/no-en': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'eslint-comments/no-use': 0,
    'no-console': 0,
    'no-magic-numbers': 0,
    'no-duplicate-imports': 0,
    'no-ternary': 0,
    'max-params': 0,
    'sort-imports': 0,
    'max-classes-per-file': [2, {max: 5}],
    'no-use-before-define': 0,
    'consistent-return': 0,
    'max-statements': [2, {max: 40}],
    'max-lines-per-function': [2, {max: 200}],
    'no-param-reassign': 0,
    'require-await': 0,
    'init-declarations': 0,
    'github/array-foreach': 0,
    'no-undefined': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-deprecated': 0,
    'import/namespace': 0,
    'capitalized-comments': 0
  },
}
