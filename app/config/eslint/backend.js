module.exports = {
  extends: ['./base.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.spec.ts', '**/test/**/*'],
      },
    ],
  },
  env: {
    node: true,
  },
};
