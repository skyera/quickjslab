import * as std from 'std';
function readFile(filename) {
    try {
        // Open the file in read mode
        const file = std.open(filename, 'r');
        if (!file) {
            throw new Error(`Failed to open file: ${filename}`);
        }

        // Read the entire file content
        const content = file.readAsString();
        file.close(); // Close the file

        return content;
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}

// Function to write to a file
function writeFile(filename, content) {
    try {
        // Open the file in write mode (creates or truncates the file)
        const file = std.open(filename, 'w');
        if (!file) {
            throw new Error(`Failed to open file: ${filename}`);
        }

        // Write the content to the file
        file.puts(content);
        file.close(); // Close the file

        console.log(`File written successfully: ${filename}`);
    } catch (error) {
        console.error(`Error writing file: ${error.message}`);
    }
}

const filename = 'example.txt';

writeFile(filename, 'Hello, QuickJS! This is a test file.');

const fileContent = readFile(filename);
if (fileContent) {
    console.log('File content:');
    console.log(fileContent);
}

const config = {
    name: "test",
    version: "1.0.0"
};

console.log("config");
console.log(JSON.stringify(config));
