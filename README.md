# quickjslab
QuickJS - JavaScript runtime and compiler laboratory

```
  ___        _      _       _ ____    _          _
 / _ \ _   _(_) ___| | __  | / ___|  | |    __ _| |__
| | | | | | | |/ __| |/ /  | \___ \  | |   / _` | '_ \
| |_| | |_| | | (__|   < |_| |___) | | |__| (_| | |_) |
 \__\_\\__,_|_|\___|_|\_\___/|____/  |_____\__,_|_.__/

```

## Setup

This repository uses QuickJS as a git submodule. To clone and build:

```bash
# Clone with submodules
git clone --recursive https://github.com/yourusername/quickjslab.git
cd quickjslab

# Or if already cloned
git submodule update --init

# Build everything
make
```

## Embedding Examples (C)

These executables demonstrate how to host QuickJS in a C application:

- `./host_file_eval demo_io_json.js` - Evaluate a file with custom C functions.
- `./host_obj_interop` - Direct C/JS object property interop.
- `./host_std_runtime demo_os_platform.js` - Full runtime with `std` and `os` modules.
- `./host_prop_inspect` - Inspect JS object metadata from C.

## JavaScript Demos

Run these using the standalone `qjs` interpreter (built in `quickjs/qjs`):

- `js_fundamentals.js` - ES6+ language basics.
- `qjs_feature_tour.js` - QuickJS specific module features.
- `visual_demos.js` - Mandelbrot, Prime Spirals, and ANSI effects.
- `js_internals_deep_dive.js` - Prototypes, descriptors, and `this` context.
- `todo_cli_app.js` - Interactive CLI application example.

## QuickJS Modules

| Module | Description |
|--------|-------------|
| `std` | File I/O, printing (`std.open`, `std.printf`) |
| `os` | System calls (`os.exec`, `os.readdir`, `os.sleep`) |
| `Math` | Math functions |
| `JSON` | Parse/stringify |
```
