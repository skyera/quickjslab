# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall -I/usr/local/include/quickjs
LDFLAGS = -L/usr/local/lib/quickjs -lquickjs -lm -ldl -lpthread

# Target executable
TARGET = ex

# Source files
SRCS = main.cpp

# Object files
OBJS = $(SRCS:.cpp=.o)

# Default target
all: $(TARGET)

# Link the executable
$(TARGET): $(OBJS)
	$(CXX) $(OBJS) -o $(TARGET) $(LDFLAGS)

# Compile source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean up build files
clean:
	rm -f $(OBJS) $(TARGET)

# Phony targets
.PHONY: all clean
