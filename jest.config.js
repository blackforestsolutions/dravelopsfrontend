module.exports = {
  projects: [
    '<rootDir>/apps/shell',
    '<rootDir>/apps/efa',
    '<rootDir>/apps/booking',
    '<rootDir>/libs/shared-styles',
    '<rootDir>/libs/generated-content',
  ],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
