module.exports = {
  displayName: 'thingsboard-thingsboard-user-thingsboard-user-provision',
  preset: '../../../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/thingsboard/thingsboard-user/thingsboard-user-provision',
};
