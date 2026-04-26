import * as std from "std";

const file = std.open(scriptArgs[0], "r");
let line;

while ((line = file.getline()) !== null) {
  std.out.puts(line);
}

file.close();
