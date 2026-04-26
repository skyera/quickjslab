#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "quickjs.h"
#include "quickjs-libc.h"

static JSValue js_console_log(JSContext *ctx, JSValueConst this_val, int argc,
        JSValueConst *argv) {
    for (int i = 0; i < argc; i++) {
        const char *str = JS_ToCString(ctx, argv[i]);
        printf("%s%s", str ? str : "<null>", i < argc - 1 ? " " : "\n");
        JS_FreeCString(ctx, str);
    }
    return JS_UNDEFINED;
}

static JSValue js_process(JSContext *ctx, JSValueConst this_val, int argc,
        JSValueConst *argv) {
    if (argc < 3) {
        return JS_ThrowRangeError(ctx, "process() expects 3 arguments");
    }

    int a, b;
    if (JS_ToInt32(ctx, &a, argv[0]) || JS_ToInt32(ctx, &b, argv[1])) {
        return JS_ThrowTypeError(ctx, "a and b must be numbers");
    }

    if (!JS_IsObject(argv[2])) {
        return JS_ThrowTypeError(ctx, "third argument must be an object");
    }

    JSValue value_prop = JS_GetPropertyStr(ctx, argv[2], "value");
    int obj_value = 0;
    if (!JS_IsUndefined(value_prop)) {
        JS_ToInt32(ctx, &obj_value, value_prop);
        printf("Object value: %d\n", obj_value);
    }
    JS_FreeValue(ctx, value_prop);

    JSValue version_prop = JS_GetPropertyStr(ctx, argv[2], "version");
    const char *version = JS_ToCString(ctx, version_prop);
    if (version) {
        printf("Object version: %s\n", version);
    }
    JS_FreeCString(ctx, version);
    JS_FreeValue(ctx, version_prop);
    
    return JS_NewInt32(ctx, a + b + obj_value);
}

int main(void) {
    printf("quickjs 2\n");
    
    JSRuntime *rt = JS_NewRuntime();
    if (!rt) {
        fprintf(stderr, "Failed to create runtime\n");
        return 1;
    }

    JSContext *ctx = JS_NewContext(rt);
    if (!ctx) {
        fprintf(stderr, "Failed to create context\n");
        JS_FreeRuntime(rt);
        return 1;
    }

    JSValue global_obj = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global_obj, "process", 
                      JS_NewCFunction(ctx, js_process, "process", 3));
    
    JSValue console = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console, "log", 
                      JS_NewCFunction(ctx, js_console_log, "log", 1));
    JS_SetPropertyStr(ctx, global_obj, "console", console);

    JS_FreeValue(ctx, global_obj);

    const char *js_code = 
        "let obj = { value: 10, version: \"1.0\" };\n"
        "let result = process(5, 3, obj);\n"
        "console.log('Result from process:', result);\n";

    JSValue result = JS_Eval(ctx, js_code, strlen(js_code), "<input>",
                             JS_EVAL_TYPE_GLOBAL);
    if (JS_IsException(result)) {
        JSValue error = JS_GetException(ctx);
        const char *error_str = JS_ToCString(ctx, error);
        fprintf(stderr, "JavaScript error: %s\n", error_str);
        JS_FreeCString(ctx, error_str);
        JS_FreeValue(ctx, error);
    }
    JS_FreeValue(ctx, result);

    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);

    return 0;
}
