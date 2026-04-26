# Define the submodule path
QJS_DIR = quickjs

# Compiler and flags
CXX = g++
CC = gcc
CXXFLAGS = -std=c++11 -Wall -I$(QJS_DIR)
CFLAGS = -Wall -I$(QJS_DIR)
LDFLAGS = -L$(QJS_DIR) -lquickjs -lm -ldl -lpthread

# Target executables
TARGETS = host_file_eval host_obj_interop host_std_runtime host_prop_inspect qjs_server

# Default target
all: $(QJS_DIR)/libquickjs.a $(TARGETS)

# Build QuickJS library in submodule
$(QJS_DIR)/libquickjs.a:
	$(MAKE) -C $(QJS_DIR) libquickjs.a

# Link the executables
host_file_eval: host_file_eval.o $(QJS_DIR)/libquickjs.a
	$(CC) host_file_eval.o -o host_file_eval $(LDFLAGS)

host_obj_interop: host_obj_interop.o $(QJS_DIR)/libquickjs.a
	$(CC) host_obj_interop.o -o host_obj_interop $(LDFLAGS)

host_std_runtime: host_std_runtime.o $(QJS_DIR)/libquickjs.a
	$(CC) host_std_runtime.o -o host_std_runtime $(LDFLAGS)

host_prop_inspect: host_prop_inspect.o $(QJS_DIR)/libquickjs.a
	$(CC) host_prop_inspect.o -o host_prop_inspect $(LDFLAGS)

qjs_server: qjs_server.o $(QJS_DIR)/libquickjs.a
	$(CXX) qjs_server.o -o qjs_server $(LDFLAGS)

# Compile C++ source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile C source files into object files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean up build files
clean:
	rm -f *.o $(TARGETS) t1 t2 t3 t4
	$(MAKE) -C $(QJS_DIR) clean

# Phony targets
.PHONY: all clean
