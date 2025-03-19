import * as std from 'std';

// Define the config object
const config = {
  name: "MyApp",
  version: "1.0.0"
};

const path = "config.json";

// Write config to a file
const file = std.open(path, "w");
file.puts(JSON.stringify(config, null, 2));
file.close();
std.out.puts("Config file written.\n");

// Read config from the file
const fileRead = std.open(path, "r");
const data = fileRead.readAsString();
fileRead.close();

const loadedConfig = JSON.parse(data);

// Print the loaded config
std.out.puts("Loaded Config: " + JSON.stringify(loadedConfig, null, 2) + "\n");
