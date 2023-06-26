import { DateObject } from "./date";

export type Calendar = { date: string; isWeekend: boolean };

export function getCalendar(date: string | Date) {
  const curDate = new DateObject(date);

  const start = curDate.setDate(1);
  const end = curDate.setLastDate();

  const lastDate = end.getDate();
  let firstDay = end.getDay() - (lastDate - 28 - 1);

  const startTempCount = start.getDay();
  const endTempCount = 42 - startTempCount - lastDate;

  const calendar: Calendar[] = [];
  for (let i = 0; i < startTempCount; i++) {
    calendar.push({ date: "", isWeekend: false });
  }
  for (let i = 1; i <= lastDate; i++) {
    let weekend = [-1, 0, 6].includes(firstDay % 7);
    let date = curDate.setDate(i).toShortDate();

    calendar.push({ date, isWeekend: weekend });
    firstDay++;
  }
  for (let i = 0; i < endTempCount; i++) {
    calendar.push({ date: "", isWeekend: false });
  }

  return calendar;
}
