#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>
#include <cstring>
#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <dirent.h>
#include <algorithm>
#include <quickjs.h>
#include <quickjs-libc.h>

std::string global_output;
JSRuntime* shared_rt = nullptr;

JSValue console_log(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    for (int i = 0; i < argc; i++) {
        const char* str = JS_ToCString(ctx, argv[i]);
        if (str) {
            if (i > 0) global_output += " ";
            global_output += str;
            JS_FreeCString(ctx, str);
        }
    }
    global_output += "\n";
    return JS_UNDEFINED;
}

std::string run_js(const char* filename) {
    global_output = "";
    if (!shared_rt) shared_rt = JS_NewRuntime();
    
    JSContext* ctx = JS_NewContext(shared_rt);

    js_init_module_std(ctx, "std");
    js_init_module_os(ctx, "os");

    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console, "log", JS_NewCFunction(ctx, console_log, "log", 1));
    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);

    std::ifstream t(filename);
    if (!t.is_open()) {
        JS_FreeContext(ctx);
        return "Error: Could not open script file.\n";
    }
    
    std::string script((std::istreambuf_iterator<char>(t)), std::istreambuf_iterator<char>());

    JSValue result = JS_Eval(ctx, script.c_str(), script.length(), filename, JS_EVAL_TYPE_GLOBAL);

    if (JS_IsException(result)) {
        JSValue exception = JS_GetException(ctx);
        const char* error = JS_ToCString(ctx, exception);
        global_output += "Error: ";
        global_output += (error ? error : "Unknown error");
        global_output += "\n";
        JS_FreeCString(ctx, error);
        JS_FreeValue(ctx, exception);
    }

    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);

    return global_output;
}

std::vector<std::string> list_scripts() {
    std::vector<std::string> scripts;
    DIR* dir = opendir(".");
    if (dir) {
        struct dirent* ent;
        while ((ent = readdir(dir)) != NULL) {
            std::string name = ent->d_name;
            if (name.length() > 3 && name.substr(name.length() - 3) == ".js") {
                scripts.push_back(name);
            }
        }
        closedir(dir);
    }
    std::sort(scripts.begin(), scripts.end());
    return scripts;
}

// Simple security check for path traversal
bool is_safe_path(const std::string& path) {
    if (path.empty()) return false;
    if (path.find("..") != std::string::npos) return false;
    if (path[0] == '/' || path[0] == '\\') return false;
    
    // Only allow .js files
    if (path.length() < 4 || path.substr(path.length() - 3) != ".js") return false;
    
    return true;
}

void start_web_server(int port) {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == 0) {
        perror("Socket failed");
        return;
    }

    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        return;
    }

    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        return;
    }

    std::cout << "Web server started on http://localhost:" << port << std::endl;

    while (true) {
        struct sockaddr_in client_address;
        int addrlen = sizeof(client_address);
        int new_socket = accept(server_fd, (struct sockaddr*)&client_address, (socklen_t*)&addrlen);
        if (new_socket < 0) {
            perror("Accept failed");
            continue;
        }

        char buffer[2048] = {0};
        read(new_socket, buffer, 2047);

        std::string request(buffer);
        std::string response;

        if (request.find("GET / ") != std::string::npos || request.find("GET /index.html") != std::string::npos) {
            response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n";
            response += "<html><head><title>QuickJS Lab</title></head><body><h1>Available Scripts</h1><ul>";
            auto scripts = list_scripts();
            for (const auto& script : scripts) {
                response += "<li><a href=\"/run?script=" + script + "\">" + script + "</a></li>";
            }
            response += "</ul></body></html>";
        } else if (request.find("GET /run?script=") != std::string::npos) {
            size_t start = request.find("script=") + 7;
            size_t end = request.find(" ", start);
            std::string script_name = request.substr(start, end - start);
            
            // URL decode simple (optional but good)
            if (is_safe_path(script_name)) {
                std::string output = run_js(script_name.c_str());
                response = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n";
                response += "Output for " + script_name + ":\n\n" + output;
            } else {
                response = "HTTP/1.1 403 Forbidden\r\nContent-Type: text/plain\r\n\r\nForbidden: Invalid script path.";
            }
        } else {
            response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nNot Found";
        }

        send(new_socket, response.c_str(), response.length(), 0);
        close(new_socket);
    }
}

int main(int argc, char* argv[]) {
    bool web_mode = false;
    int port = 8080;

    for (int i = 1; i < argc; i++) {
        if (std::string(argv[i]) == "-w") {
            web_mode = true;
        } else if (std::string(argv[i]) == "-p" && i + 1 < argc) {
            port = std::atoi(argv[++i]);
        }
    }

    if (web_mode) {
        start_web_server(port);
    } else {
        if (argc < 2 || (argc == 2 && web_mode)) {
            std::cout << "Usage: " << argv[0] << " [-w] [-p port] <script.js>" << std::endl;
            return 1;
        }
        std::string output = run_js(argv[argc - 1]);
        std::cout << output;
    }

    if (shared_rt) JS_FreeRuntime(shared_rt);
    return 0;
}
