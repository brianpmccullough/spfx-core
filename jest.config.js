module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // optional, but you can adjust this pattern
  moduleFileExtensions: ['ts', 'js', 'json'],
};
