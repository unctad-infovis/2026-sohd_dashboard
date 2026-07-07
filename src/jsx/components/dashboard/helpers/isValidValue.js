const isValidValue = value => {
  if (value === null || value === undefined) return false;

  const cleaned = String(value).trim();

  if (cleaned === '' || cleaned === 'NA') return false;

  return Number.isFinite(Number(cleaned));
};

export default isValidValue;
