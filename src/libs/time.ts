export const getStartOfDayUTC = (): number => {
  const now = new Date();
  const startOfDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return startOfDay;
};
