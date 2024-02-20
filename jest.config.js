/**
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '\\.(scss)$': 'identity-obj-proxy',
    },
    prettierPath: require.resolve('prettier-2'),
    rootDir: '.',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
    },
    transformIgnorePatterns: ['/node_modules/'],
};

module.exports = config;
