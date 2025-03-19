#include "quickjs.h"
#include "quickjs-libc.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    printf("quickjs 3\n");
    if (argc < 2) {
        fprintf(stderr, "Usage: %s script.js\n", argv[0]);
        return 1;
    }

    // Create a new QuickJS runtime and context
    JSRuntime *rt = JS_NewRuntime();
    if (!rt) {
        fprintf(stderr, "Failed to create QuickJS runtime\n");
        return 1;
    }
    JSContext *ctx = JS_NewContext(rt);
    if (!ctx) {
        fprintf(stderr, "Failed to create QuickJS context\n");
        JS_FreeRuntime(rt);
        return 1;
    }

    // Initialize QuickJS standard library
    js_std_init_handlers(rt);
    js_std_add_helpers(ctx, argc, argv);
    js_init_module_std(ctx, "std");
    js_init_module_os(ctx, "os");

    // Read the script file
    FILE *fp = fopen(argv[1], "rb");
    if (!fp) {
        perror("fopen");
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);
        return 1;
    }
    fseek(fp, 0, SEEK_END);
    long size = ftell(fp);
    rewind(fp);
    char *script = (char *)malloc(size + 1);
    if (!script) {
        fprintf(stderr, "Memory allocation failed\n");
        fclose(fp);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);
        return 1;
    }
    fread(script, 1, size, fp);
    script[size] = '\0';
    fclose(fp);

    // Execute the script
    JSValue result = JS_Eval(ctx, script, size, argv[1], JS_EVAL_TYPE_MODULE);
    if (JS_IsException(result)) {
        js_std_dump_error(ctx);
    }
    JS_FreeValue(ctx, result);
    free(script);

    // Cleanup
    js_std_free_handlers(rt);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);

    return 0;
}
