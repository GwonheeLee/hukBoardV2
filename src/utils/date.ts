export class DateObject {
  private _date: Date;
  constructor(date?: string | Date) {
    if (!date) {
      const tempDate = new Date();
      this._date = tempDate;
    } else {
      const tempDate = new Date(date);
      this._date = tempDate;
    }
  }
  static getBetweenDate(startDate: string, endDate: string) {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
      dates.push(i.toISOString().split("T")[0]);
    }

    return dates;
  }
  getThisDate() {
    return this._date;
  }
  toShortDate() {
    const yyyy = this._date.getFullYear().toString();
    const MM = (this._date.getMonth() + 1).toString().padStart(2, "0");
    const dd = this._date.getDate().toString().padStart(2, "0");

    return `${yyyy}-${MM}-${dd}`;
  }

  getFullYear() {
    return this._date.getFullYear();
  }
  getMonth() {
    return this._date.getMonth();
  }
  getDate() {
    return this._date.getDate();
  }
  getDay() {
    return this._date.getDay();
  }
  getFullYearString() {
    return this._date.getFullYear().toString();
  }
  getMonthString() {
    return (this._date.getMonth() + 1).toString().padStart(2, "0");
  }
  getDateString() {
    return this._date.getDate().toString().padStart(2, "0");
  }

  getLastDate() {
    return this.setLastDate().getDateString();
  }

  setFullYear(year: number) {
    let tempDate = new Date(this._date);

    tempDate.setFullYear(year);

    return new DateObject(tempDate);
  }

  setMonth(month: number) {
    let tempDate = new Date(this._date);

    tempDate.setMonth(month);

    return new DateObject(tempDate);
  }

  setDate(day: number) {
    let tempDate = new Date(this._date);

    tempDate.setDate(day);

    return new DateObject(tempDate);
  }

  setLastDate() {
    let tempDate = new Date(this._date);
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(0);

    return new DateObject(tempDate);
  }
}

export function convertToMonthType(month: number | string) {
  return ("0" + month).slice(-2);
}
