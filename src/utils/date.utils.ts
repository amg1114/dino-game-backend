/**
 * Builds a start and end date for a given year and optionally a specific month.
 *
 * @param year - The year for which the start and end dates are to be generated. Must be a string in the format 'YYYY'.
 * @param month - (Optional) The month for which the start and end dates are to be generated. Must be a string in the format 'MM'.
 *                 If not provided, the function will return the start date as January 1st and the end date as December 31st of the given year.
 * @returns An object containing:
 *          - `startDate`: A `Date` object representing the start of the specified year and month (or January 1st if no month is provided).
 *          - `endDate`: A `Date` object representing the end of the specified year and month (or December 31st if no month is provided).
 */
export function buildStartEndDate(year: string, month?: string) {
  const parsedMonth = month ? parseInt(month) - 1 : 0;
  const startDate = new Date(+year, parsedMonth, 1);
  const endDate = month
    ? new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
    : new Date(+year, 11, 31);

  return { startDate, endDate };
}
