export const formatDate = (date, addDays = 0) => {
  const d = new Date(date);
  d.setDate(d.getDate() + addDays);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
