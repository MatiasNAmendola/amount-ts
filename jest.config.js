module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './jest',
                filename: 'report.html',
                expand: false,
            },
        ],
    ],
};
