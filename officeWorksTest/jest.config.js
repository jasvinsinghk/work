module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    silent: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}'
    ],
    globals: {
        'ts-jest': {
        isolatedModules: true,
        diagnostics: {
            include: /\.(spec)\.ts$/,
            ignoreCodes: [2571, 6031, 18003]
        }
        }
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
    ],
    coverageThreshold: {
        global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
        },
    }
};