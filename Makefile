# Compiler and flags
CXX = g++
CC = gcc
CXXFLAGS = -std=c++11 -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
CFLAGS = -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
LDFLAGS = -L/usr/local/lib/quickjs -L/usr/lib/quickjs -lquickjs -lm -ldl -lpthread

# Target executables
TARGET_CXX = ex
TARGET_C = embedjs_exe
TARGET_C1 = embedjs1_exe  # New executable for embedjs1.c

# Source files
SRCS_CXX = main.cpp
SRCS_C = embedjs.c
SRCS_C1 = embedjs1.c      # New source file

# Object files
OBJS_CXX = $(SRCS_CXX:.cpp=.o)
OBJS_C = $(SRCS_C:.c=.o)
OBJS_C1 = $(SRCS_C1:.c=.o)  # New object file

# Default target
all: $(TARGET_CXX) $(TARGET_C) $(TARGET_C1)  # Add new target

# Link the C++ executable
$(TARGET_CXX): $(OBJS_CXX)
	$(CXX) $(OBJS_CXX) -o $(TARGET_CXX) $(LDFLAGS)

# Link the first C executable (embedjs_exe)
$(TARGET_C): $(OBJS_C)
	$(CC) $(OBJS_C) -o $(TARGET_C) $(LDFLAGS)

# Link the second C executable (embedjs1_exe)
$(TARGET_C1): $(OBJS_C1)
	$(CC) $(OBJS_C1) -o $(TARGET_C1) $(LDFLAGS)

# Compile C++ source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile C source files into object files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean up build files
clean:
	rm -f $(OBJS_CXX) $(OBJS_C) $(OBJS_C1) $(TARGET_CXX) $(TARGET_C) $(TARGET_C1)  # Update clean

# Phony targets
.PHONY: all clean
