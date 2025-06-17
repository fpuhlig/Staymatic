module.exports = {
  extends: [
    './base.js',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['tailwind.config.ts'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/prefer-default-export': ['error', { target: 'any' }],
  },
  overrides: [
    {
      files: ['**/api/**/*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
