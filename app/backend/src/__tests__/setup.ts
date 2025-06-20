// Test setup file - this file just sets up global test configurations
// The actual mocks are handled in individual test files

// Global test timeout
jest.setTimeout(10000);

// This is just a setup file to ensure Jest knows this file exists
describe('Setup', () => {
  it('should be ready for testing', () => {
    expect(true).toBe(true);
  });
});
