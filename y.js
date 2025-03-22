import * as std from 'std';

let todos = [];

function addTodo(task) {
    const todo = {
        id: Date.now(), // Using timestamp as a simple unique ID
        task: task,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    todos.push(todo);
    return todo;
}

function showTodos() {
    if (todos.length === 0) {
        print("No todos found!");
        return;
    }
    
    print("\n=== Todo List ===");
    todos.forEach((todo, index) => {
        const status = todo.completed ? "[✓]" : "[ ]";
        print(`${index + 1}. ${status} ${todo.task}`);
        print(`   ID: ${todo.id} | Created: ${todo.createdAt}`);
    });
    print(`Total: ${todos.length} todos\n`);
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        return true;
    }
    return false;
}

function main() {
    print("Welcome to QuickJS Todo App!");
    print("Commands: add <task>, show, toggle <id>, quit");
    
    while (true) {
        const input = std.in.getline();
        if (!input) break;
        
        const [command, ...args] = input.trim().split(" ");
        
        switch (command.toLowerCase()) {
            case "add":
                const task = args.join(" ");
                if (task) {
                    const newTodo = addTodo(task);
                    print(`Added: ${newTodo.task}`);
                } else {
                    print("Please provide a task!");
                }
                break;
                
            case "show":
                showTodos();
                break;
                
            case "toggle":
                const id = parseInt(args[0]);
                if (isNaN(id)) {
                    print("Please provide a valid ID!");
                } else if (toggleTodo(id)) {
                    print(`Toggled todo ${id}`);
                    showTodos();
                } else {
                    print(`Todo ${id} not found!`);
                }
                break;
                
            case "quit":
            case "exit":
                print("Goodbye!");
                return;
                
            default:
                print("Unknown command! Available: add, show, toggle, quit");
        }
    }
}

main();
