#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "quickjs.h"
#include "quickjs-libc.h"

JSValue console_log(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    for (int i = 0; i < argc; i++) {
        const char* str = JS_ToCString(ctx, argv[i]);
        if (str) {
            printf("%s ", str);
            JS_FreeCString(ctx, str);
        }
    }
    printf("\n");
    return JS_UNDEFINED;
}

JSValue add(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    int a, b;
    JS_ToInt32(ctx, &a, argv[0]); // Convert first argument to int
    JS_ToInt32(ctx, &b, argv[1]); // Convert second argument to int
    return JS_NewInt32(ctx, a + b); // Return the sum
}

char* readFile(const char* filename) {
    FILE* file = fopen(filename, "rb");
    if (!file) {
        perror("Failed to open file");
        return NULL;
    }

    fseek(file, 0, SEEK_END);
    long fileSize = ftell(file);
    fseek(file, 0, SEEK_SET);

    char* buffer = (char*)malloc(fileSize + 1);
    if (!buffer) {
        fclose(file);
        perror("Failed to allocate memory");
        return NULL;
    }

    fread(buffer, 1, fileSize, file);
    buffer[fileSize] = '\0'; // Null-terminate the string
    fclose(file);

    return buffer;
}

int main(int argc, char* argv[]) {
    printf("quickjs 1\n");
    if (argc < 2) {
        printf("Usage: %s <javascript-file>\n", argv[0]);
        return 1;
    }

    const char* filename = argv[1];
    char* script = readFile(filename);
    if (!script) {
        return 1;
    }

    JSRuntime* rt = JS_NewRuntime();
    JSContext* ctx = JS_NewContext(rt);

    js_init_module_std(ctx, "std");

    JSValue global = JS_GetGlobalObject(ctx);
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console, "log", JS_NewCFunction(ctx, console_log, "log", 1));
    JS_SetPropertyStr(ctx, global, "console", console);
    JS_FreeValue(ctx, global);

    JS_SetPropertyStr(ctx, global, "add", JS_NewCFunction(ctx, add, "add", 2));

    JSValue result = JS_Eval(ctx, script, strlen(script), filename, JS_EVAL_TYPE_MODULE);

    if (JS_IsException(result)) {
        JSValue exception = JS_GetException(ctx);
        const char* error = JS_ToCString(ctx, exception);
        printf("Error: %s\n", error);
        JS_FreeCString(ctx, error);
        JS_FreeValue(ctx, exception);
    } else {
        if (!JS_IsUndefined(result)) {
            const char* resultStr = JS_ToCString(ctx, result);
            printf("Result: %s\n", resultStr);
            JS_FreeCString(ctx, resultStr);
        }
    }

    free(script);
    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);

    return 0;
}
