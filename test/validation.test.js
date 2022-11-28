[tvalid,avalid,pvalid] = require('../src/validation');

test('Book entry with: <title:It, author:Stephen King, pages:500> is  acceptable', () => {
  expect(tvalid('It')).toBe(true);
  expect(avalid('Stephen King')).toBe(true);
  expect(pvalid('500')).toBe(true);
});