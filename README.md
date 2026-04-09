# quickjslab
QuickJS - JavaScript runtime and compiler

```
  ___        _      _       _ ____    _          _
 / _ \ _   _(_) ___| | __  | / ___|  | |    __ _| |__
| | | | | | | |/ __| |/ /  | \___ \  | |   / _` | '_ \
| |_| | |_| | | (__|   < |_| |___) | | |__| (_| | |_) |
 \__\_\\__,_|_|\___|_|\_\___/|____/  |_____\__,_|_.__/

```

## Run JavaScript

```bash
# Run a JS file
qjs ex1.js

# Run inline code
qjs -e 'console.log("Hello!")'
```

## Compile JS to Binary

```bash
# Compile to standalone binary
qjsc -o myapp ex1.js

# Run the binary
./myapp

# Include std/os modules
qjsc -o myapp -m ex1.js
```

## QuickJS Modules

| Module | Description |
|--------|-------------|
| `std` | File I/O, printing (`std.open`, `std.printf`) |
| `os` | System calls (`os.exec`, `os.readdir`, `os.sleep`) |
| `Math` | Math functions |
| `JSON` | Parse/stringify |

## Examples

- `ex1.js` - JavaScript basics exercise
- `basic.js` - QuickJS features demo
- `fib.js` - Fibonacci implementations
