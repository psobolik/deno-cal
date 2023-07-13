import { parse } from "https://deno.land/std@0.194.0/flags/mod.ts";
import { Args } from "./args.ts";

export const HelpText = `
usage: cal [-h] [-Y] [-x EXTRA] [-3] [-b BEFORE] [-a AFTER] [-w WIDTH] [-m MONTH] [-y YEAR] [-v]

Calendar printer

optional arguments:
  -h, --help            show this help message and exit
  -Y, --current-year    Display a calendar for the current year. (Ignore other arguments)
  -x EXTRA, --extra EXTRA
                        Display number of months before and after. Same as --before EXTRA --after EXTRA. (Default 0)
  -3                    Display prev/current/next months. Same as --extra 1.
  -b BEFORE, --before BEFORE
                        Display number of months before. (Default 0)
  -a AFTER, --after AFTER
                        Display number of months after. (Default 0)
  -w WIDTH, --width WIDTH
                        Display number of months per line. (Default 3)
  -m MONTH, --month MONTH
                        The month (1-12) to display. (Default current month)
  -y YEAR, --year YEAR  The year to display. (Default current year)
  -v, --version         show program's version number and exit
`;
export abstract class ArgParser {
  public static parseArgs(clargs: string[]): Args {
    const args = parse(clargs, {
      boolean: ["h", "Y", "3", "v"],
      alias: {
        "help": "h",
        "current-year": "Y",
        "extra": "x",
        "before": "b",
        "after": "a",
        "width": "w",
        "month": "m",
        "year": "y",
        "version": "v",
      },
      default: { 
        "x": 0,
        "b": 0,
        "a": 0,
        "w": 3, 
      },
    });
    
    return {
        showCurrentYear: args.Y,
        monthsBefore: (args['3'] ? 1 : args.extra || args.before) as number,
        monthsAfter: (args['3'] ? 1 : args.extra || args.after) as number,
        width: args.width as number,
        month: args.month as number,
        year: args.y as number,
        showVersion: args.v,
        showHelp: args.h,
    };
  }
}