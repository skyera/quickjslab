# Compiler and flags
CXX = g++
CC = gcc
CXXFLAGS = -std=c++11 -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
CFLAGS = -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
LDFLAGS = -L/usr/local/lib/quickjs -L/usr/lib/quickjs -lquickjs -lm -ldl -lpthread

# Target executables
TARGET_CXX = ex
TARGET_C = embedjs_exe

# Source files
SRCS_CXX = main.cpp
SRCS_C = embedjs.c

# Object files
OBJS_CXX = $(SRCS_CXX:.cpp=.o)
OBJS_C = $(SRCS_C:.c=.o)

# Default target
all: $(TARGET_CXX) $(TARGET_C)

# Link the C++ executable
$(TARGET_CXX): $(OBJS_CXX)
	$(CXX) $(OBJS_CXX) -o $(TARGET_CXX) $(LDFLAGS)

# Link the C executable
$(TARGET_C): $(OBJS_C)
	$(CC) $(OBJS_C) -o $(TARGET_C) $(LDFLAGS)

# Compile C++ source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile C source files into object files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean up build files
clean:
	rm -f $(OBJS_CXX) $(OBJS_C) $(TARGET_CXX) $(TARGET_C)

# Phony targets
.PHONY: all clean
