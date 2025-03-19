# Compiler and flags
CXX = g++
CC = gcc
CXXFLAGS = -std=c++11 -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
CFLAGS = -Wall -I/usr/local/include/quickjs -I/usr/include/quickjs
LDFLAGS = -L/usr/local/lib/quickjs -L/usr/lib/quickjs -lquickjs -lm -ldl -lpthread

# Target executables
TARGET_C1 = t1
TARGET_C2 = t2
TARGET_C3 = t3  # New executable for embedjs1.c

# Source files
SRCS_C1 = test1.c
SRCS_C2 = test2.c
SRCS_C3 = test3.c      # New source file

# Object files
OBJS_C1 = $(SRCS_C1:.c=.o)
OBJS_C2 = $(SRCS_C2:.c=.o)
OBJS_C3 = $(SRCS_C3:.c=.o)  # New object file

# Default target
all: $(TARGET_C1) $(TARGET_C2) $(TARGET_C3)  # Add new target

# Link the C++ executable
$(TARGET_C1): $(OBJS_C1)
	$(CC) $(OBJS_C1) -o $(TARGET_C1) $(LDFLAGS)

# Link the first C executable (embedjs_exe)
$(TARGET_C2): $(OBJS_C2)
	$(CC) $(OBJS_C2) -o $(TARGET_C2) $(LDFLAGS)

# Link the second C executable (embedjs1_exe)
$(TARGET_C3): $(OBJS_C3)
	$(CC) $(OBJS_C3) -o $(TARGET_C3) $(LDFLAGS)

# Compile C++ source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile C source files into object files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean up build files
clean:
	rm -f $(OBJS_C1) $(OBJS_C2) $(OBJS_C3) $(TARGET_C1) $(TARGET_C2) $(TARGET_C3)  # Update clean

# Phony targets
.PHONY: all clean
