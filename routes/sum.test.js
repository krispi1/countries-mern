const sum = require('./sum');

test('adds 1 + 3 to equal 4', () => {
  expect(sum(1, 3)).toBe(4);
});