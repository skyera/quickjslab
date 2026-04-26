#include <stdio.h>
#include <string.h>
#include "quickjs.h"
#include "quickjs-libc.h"

static JSValue js_inspect(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc < 1 || !JS_IsObject(argv[0])) {
        return JS_ThrowTypeError(ctx, "inspect() expects an object");
    }
    JSValue name = JS_GetPropertyStr(ctx, argv[0], "name");
    const char *name_str = JS_ToCString(ctx, name);
    printf("Object name: %s\n", name_str ? name_str : "undefined");
    JS_FreeCString(ctx, name_str);
    JS_FreeValue(ctx, name);
    return JS_UNDEFINED;
}

int main() {
    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);

    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "inspect", JS_NewCFunction(ctx, js_inspect, "inspect", 1));
    JS_FreeValue(ctx, global);

    const char *code = "let person = { name: 'Alice', age: 25 }; inspect(person);";
    JSValue result = JS_Eval(ctx, code, strlen(code), "<input>", JS_EVAL_TYPE_GLOBAL);
    if (JS_IsException(result)) {
        JSValue err = JS_GetException(ctx);
        printf("Error: %s\n", JS_ToCString(ctx, err));
        JS_FreeValue(ctx, err);
    }
    JS_FreeValue(ctx, result);

    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return 0;
}
