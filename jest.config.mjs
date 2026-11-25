export default {
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '.*\\.spec\\.ts$',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@prisma-generate/(.*)\\.js$': '<rootDir>/src/generated/prisma/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
    transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: './tsconfig.json' }],
  },
  collectCoverageFrom: ['src/**/*.ts'],
}
