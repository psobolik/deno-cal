export class MonthCalendar {
  year: number;
  month: number;
  weeks: Array<Array<number>>;

  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
    this.weeks = new Array<Array<number>>();

    let day = getFirstDay(year, month);
    const lastDay = getLastDay(year, month);
    while (day <= lastDay) {
      const days = new Array<number>();
      while (days.length < 7) {
        const dayStr = day > 0 && day <= lastDay ? day : NaN;
        days.push(dayStr);
        ++day;
      }
      this.weeks.push(days);
    }

    function getFirstDay(year: number, month: number): number {
      const date = new Date(year, month);
      return 1 - date.getDay();
    }

    function getLastDay(year: number, month: number) {
      const lastDay = new Date(year, month + 1, 0);
      return lastDay.getDate();
    }
  }
}

export class Calendar {
  months: Array<MonthCalendar>;

  constructor(year: number, firstMonth: number, monthCount: number) {
    this.months = new Array<MonthCalendar>();
    for (let i = 0; i < monthCount; ++i) {
      const date = new Date(
        year,
        firstMonth + i,
      );
      this.months.push(
        new MonthCalendar(date.getFullYear(), date.getMonth())
      );
    }
  }
}
