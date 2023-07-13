cal
===

A console program to display a calendar. Similar to the common Unix command, but with different arguments. Ported from an earlier Node.js version.

Build
=====
Requires [Deno](https://deno.com/runtime). Puts executables into a subfolder of the `dist/` folder.

Mac:

> deno compile --target x86_64-apple-darwin --output dist/x86_64-apple-darwin/cal ./src/main.ts

Windows:

>deno compile --target x86_64-pc-windows-msvc --output dist/x86_64-pc-windows-msvc/cal ./src/main.ts

Linux: 

>deno compile --target x86_64-unknown-linux-gnu --output ./src/dist/x86_64-unknown-linux-gnu/cal main.ts

Usage
=====

```
usage: cal [-h] [-v] [-Y] [-x EXTRA] [-b BEFORE] [-a AFTER] [-w WIDTH]
              [-m MONTH] [-y YEAR]

Optional arguments:
  -h, --help                    Show this help message and exit.
  -v, --version                 Show program's version number and exit.
  -Y                            Display a calendar for the current year.
                                (Ignore other arguments)
  -x EXTRA, --extra EXTRA       Display number of months before and after.
                                Same as --before EXTRA --after EXTRA.
                                (Default 0)
  -3                            Display prev/current/next months. Same
                                as --extra 1.
  -b BEFORE, --before BEFORE    Display number of months before. (Default 0)
  -a AFTER, --after AFTER       Display number of months after. (Default 0)
  -w WIDTH, --width WIDTH       Display number of months per line. (Default 3)
  -m MONTH, --month MONTH       The month (1-12) to display. (Default current month)
  -y YEAR, --year YEAR          The year to display. (Default current year)
  ```

License
=======
[ICS](LICENSE)
------
