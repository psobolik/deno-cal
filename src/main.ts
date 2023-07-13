import { ArgParser, HelpText } from "./argParser.ts";
import { Version } from "./version.ts";
import { Calendar } from "./calendar.ts";
import { CalendarPrinter } from "./calendarPrinter.ts";

// import.meta.main will be true if the current module is the program entry point
if (import.meta.main) {
  const args = ArgParser.parseArgs(Deno.args);

  if (args.showHelp) {
    console.log(HelpText);
    Deno.exit(0);
  }

  if (args.showVersion) {
    console.log(`cal version ${Version}`);
    Deno.exit(0);
  }
  
  const width = args.width || 3;

  const now = new Date()
  let month, year, monthCount = 1;

  if (args.showCurrentYear) {
    month = 0;
    year = now.getFullYear();
    monthCount = 12;
  } else {
    month = args.month ? --args.month : now.getMonth();
    year = args.year || now.getFullYear();
    monthCount += args.monthsBefore + args.monthsAfter;

    const firstMonth = new Date(year, month - args.monthsBefore);
    month = firstMonth.getMonth();
    year = firstMonth.getFullYear();
  }

  const calendar = new Calendar(year, month, monthCount);
  CalendarPrinter.Print(calendar, { across: width });
}
