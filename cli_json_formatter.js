import * as std from "std";

let input = "";
let line;

while ((line = std.in.getline()) !== null) {
  input += line;
}

const obj = JSON.parse(input);
std.out.puts(JSON.stringify(obj, null, 2));

