import * as std from 'std';
import * as os from 'os';
let config = {
    "name": "test",
    "version": "1.0.0"
};

let config_str = JSON.stringify(config);
std.puts(config_str, "\n");

var platform = os.platform;
std.puts("os platform: ", platform, "\n");

print("hello");
