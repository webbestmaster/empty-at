module.exports = {
  preset: 'ts-jest',
/*
  moduleNameMapper: {
    '\\.(csv)$': '<rootDir>/__mocks__/csvMock.js',
    '\\.(scss|css|less|png|gif)$': 'identity-obj-proxy',
    '^archilyse-ui-components$': '<rootDir>/../common/src',
  },
*/
  globals: {
    'ts-jest': {
      // babelConfig: true,
      tsconfig: 'tsconfig.test.json',
    },
    // React: {},
  },
  // setupFilesAfterEnv: ['./setupJest.ts'],
  testTimeout: 10000,
  // testPathIgnorePatterns: ['.spec'],
};
