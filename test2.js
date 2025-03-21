import * as std from 'std';

let config = {
  name: "MyApp",
  version: "1.0.0"
};

const path = "config.json";

const file = std.open(path, "w");
file.puts(JSON.stringify(config, null, 2));
file.close();
std.out.puts("Config file written.\n");

const fileRead = std.open(path, "r");
const data = fileRead.readAsString();
fileRead.close();

const loadedConfig = JSON.parse(data);

std.out.puts("Loaded Config: " + JSON.stringify(loadedConfig, null, 2) + "\n");

var myobj = {key1:"hello", key2:"world"};
std.out.puts("myobj: ", JSON.stringify(myobj), "\n");
