const path = require('path');

jest.mock('path', () => ({
  ...jest.requireActual('path-browserify'),
  resolve: jest.fn(),
}));