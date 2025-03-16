#include <stdio.h>
#include <stdlib.h>
#include "quickjs.h"
#include <string.h>

JSValue add(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    int a, b;
    
    JS_ToInt32(ctx, &a, argv[0]);
    JS_ToInt32(ctx, &b, argv[1]);

    return JS_NewInt32(ctx, a + b);
}

int main() {
    JSRuntime* rt = JS_NewRuntime();
    JSContext* ctx = JS_NewContext(rt);

    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "add", JS_NewCFunction(ctx, add, "add", 2));
    JS_FreeValue(ctx, global);

    const char* script = "add(10, 20);";
    JSValue result = JS_Eval(ctx, script, strlen(script), "<eval>", JS_EVAL_TYPE_GLOBAL);

    if (JS_IsException(result)) {
        JSValue exception = JS_GetException(ctx);
        const char* error = JS_ToCString(ctx, exception);
        printf("Error: %s\n", error);
        JS_FreeCString(ctx, error);
        JS_FreeValue(ctx, exception);
    } else {
        int intResult = JS_VALUE_GET_INT(result);
        printf("Result: %d\n", intResult);
    }

    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);

    return 0;
}
