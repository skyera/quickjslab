import * as std from 'std';
import * as os from 'os';

function* fibonacci() {
    let a = 0n, b = 1n;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
for (let i = 0; i < 20; i++) {
    print(`Fib(${i}): ${fib.next().value}`);
}

const frames = ['|', '/', '-', '\\'];
let i = 0;

function spin() {
    print('\r' + frames[i % frames.length] + ' Spinning...'); // \r rewrites the line
    i++;
}

// print("Press Ctrl+C to stop!");
// while (true) {
//     spin();
//     os.sleep(100);
// }

const colors = [
    "\x1b[31m", // Red
    "\x1b[33m", // Yellow
    "\x1b[32m", // Green
    "\x1b[36m", // Cyan
    "\x1b[34m", // Blue
    "\x1b[35m", // Magenta
];
const reset = "\x1b[0m";

function rainbowText(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += colors[i % colors.length] + text[i];
    }
    return result + reset;
}

const message = "Hello, QuickJS!";
print(rainbowText(message));
for (let i = 0; i < 5; i++) {
    os.sleep(500);
    print(rainbowText(message.split("").reverse().join(""))); // Reverse it
}

function mandelbrot(width, height) {
    let output = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let cx = (x / width) * 3.5 - 2.5;
            let cy = (y / height) * 2 - 1;
            let zx = 0, zy = 0;
            let i = 0;
            for (; i < 20; i++) {
                let zx2 = zx * zx, zy2 = zy * zy;
                if (zx2 + zy2 > 4) break;
                zy = 2 * zx * zy + cy;
                zx = zx2 - zy2 + cx;
            }
            output += i === 20 ? "*" : " ";
        }
        output += "\n";
    }
    return output;
}

print(mandelbrot(70, 20));

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
}

function generateSpiral(size) {
    let grid = Array(size).fill().map(() => Array(size).fill(" "));
    let x = Math.floor(size / 2), y = x;
    let dx = 0, dy = -1;
    let steps = 1, stepCount = 0, directionChanges = 0;

    for (let n = 1; n <= size * size; n++) {
        grid[y][x] = isPrime(n) ? "*" : ".";
        if (stepCount === steps) {
            stepCount = 0;
            [dx, dy] = [-dy, dx]; // Rotate 90 degrees
            directionChanges++;
            if (directionChanges === 2) {
                steps++;
                directionChanges = 0;
            }
        }
        x += dx;
        y += dy;
        stepCount++;
    }
    return grid;
}

let spiral = generateSpiral(11);
spiral.forEach(row => print(row.join(" ")));
