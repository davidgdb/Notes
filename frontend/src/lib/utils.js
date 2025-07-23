export function formatedDate(date) {
  const dateObj = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString('en-GB', options);
}
