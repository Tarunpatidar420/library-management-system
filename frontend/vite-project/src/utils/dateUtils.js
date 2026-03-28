export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const isBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const givenDate = new Date(date);
  givenDate.setHours(0, 0, 0, 0);

  return givenDate < today;
};