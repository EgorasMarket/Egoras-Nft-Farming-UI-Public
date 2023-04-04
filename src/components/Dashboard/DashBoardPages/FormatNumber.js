function formatNumber(number) {
  const abbreviations = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
  };

  const num = parseFloat(number);

  for (const abbreviation in abbreviations) {
    if (
      num >= abbreviations[abbreviation] &&
      num < abbreviations[abbreviation] * 1000
    ) {
      return `${(num / abbreviations[abbreviation]).toFixed(1)}${abbreviation}`;
    }
  }

  return num.toLocaleString();
}
export default formatNumber;
