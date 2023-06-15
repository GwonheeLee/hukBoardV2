export const regEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
export const regPhone = /^\d{3}-\d{3,4}-\d{4}$/;

export const regShortDate = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
export const regYear = /(20[2-5][0-9])$/;
export const regMonth = /(0[1-9]|1[012])$/;
export const regDay = /(0[1-9]|[12][0-9]|3[01])$/;

export const regYearMonthDay = /(YEAR|MONTH|DAY)$/;
export const regYearMonth = /(YEAR|MONTH)$/;
