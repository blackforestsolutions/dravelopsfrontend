const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
