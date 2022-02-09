// jest.config.js
module.exports = {
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: { '@/(.*)': '<rootDir>/src/$1', '\\.(css)$': '<rootDir>/__mocks__/styleMock.js' },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  testPathIgnorePatterns: [
    'node_modules',
    'src/components', // by now we're nt testing the components
    '.history' // VSCode Extension
  ]
}
