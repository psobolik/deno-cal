import { Calendar, MonthCalendar } from "./calendar.ts";

export type CalendarPrinterOptions = {
  across?: number;
};

export abstract class CalendarPrinter {
  public static Print(calendar: Calendar, options: CalendarPrinterOptions) {
    const textEncoder = new TextEncoder();
    const across = options.across || 3;
    const padding = 2;
    const cellWidth = padding + 1;
    const lineLength = (cellWidth * 8) - 1;
    const blankWeek = textEncoder.encode(' '.repeat(lineLength));
    const eow = textEncoder.encode(' '.repeat(padding));
    const eol = textEncoder.encode('\n');

    let m = 0;
    while (m < calendar.months.length) {
      const months = calendar.months.slice(m, m + across);
      m += across;
      const weekCt = maxWeeks(months);
      printMonthHeaders(months, cellWidth, lineLength);
      printWeekHeaders(months.length, padding);

      for (let weekIndex = 0; weekIndex < weekCt; ++weekIndex) {
        months.forEach((month) => {
          if (weekIndex < month.weeks.length) {
            const week = month.weeks[weekIndex];
            Deno.stdout.write(textEncoder.encode(formatLine(week, padding)));
            Deno.stdout.write(eow);
          } else {
            Deno.stdout.write(blankWeek);
          }
        }, this);
        Deno.stdout.write(eol);
      }
      Deno.stdout.write(eol);
    }

    function maxWeeks(months: Array<MonthCalendar>): number {
      return months.reduce((weekCt, month) => {
        return Math.max(weekCt, month.weeks.length);
      }, 0);
    }

    function formatLine(items: Array<string | number>, width: number) {
      const formatItem = (value: string | number, width: number) => {
        const str = (typeof value === 'string') ? value : isNaN(Number(value)) ? ' ' : value.toString();
        const pad = str.length < width ? ' '.repeat(width - str.length) : '';
        return `${pad}${str} `;
      };
      return items
        .map((item) => formatItem(item, width))
        .join('');
    }

    function printMonthHeaders(
      months: Array<MonthCalendar>,
      cellWidth: number,
      lineLength: number,
    ) {
      const formatMonthHeader = (month: MonthCalendar): string => {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const blankWeek = ' '.repeat(lineLength);
        const value = `${monthNames[month.month]} ${month.year}`;
        const vl = value.length;
        const fl = Math.ceil((lineLength - vl - cellWidth) / 2);
        const rl = lineLength - fl - vl;
        return blankWeek.substring(0, fl) + value + blankWeek.substring(0, rl);
      };
      months.forEach((month) =>
        Deno.stdout.write(textEncoder.encode(formatMonthHeader(month)))
      );
      Deno.stdout.write(textEncoder.encode('\n'));
    }

    function printWeekHeaders(months: number, padding: number) {
      const weekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      while(months-- > 0) {
        Deno.stdout.write(textEncoder.encode(formatLine(weekNames, padding)));
        Deno.stdout.write(textEncoder.encode(' '.repeat(padding)));
      }
      Deno.stdout.write(textEncoder.encode('\n'));
    }
  }
}
