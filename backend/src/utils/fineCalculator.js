const calculateFine = (expectedReturnDate, actualReturnDate, finePerDay = 10) => {
  const expected = new Date(expectedReturnDate);
  const actual = new Date(actualReturnDate);

  expected.setHours(0, 0, 0, 0);
  actual.setHours(0, 0, 0, 0);

  if (actual <= expected) return 0;

  const diffMs = actual - expected;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays * finePerDay;
};

module.exports = calculateFine;