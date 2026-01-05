#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Todo Flow Development Environment${NC}"
echo ""

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed. Please install it first.${NC}"
    echo "   npm install -g pnpm"
    exit 1
fi

# Build shared package if dist doesn't exist
if [ ! -d "shared/dist" ]; then
    echo -e "${YELLOW}📦 Building shared package...${NC}"
    cd shared && pnpm build && cd ..
    echo -e "${GREEN}✅ Shared package built${NC}"
    echo ""
fi

# Initialize database if it doesn't exist
if [ ! -f "backend/data/sqlite.db" ]; then
    echo -e "${YELLOW}🗄️ Initializing database...${NC}"
    cd backend && pnpm db:push && cd ..
    echo -e "${GREEN}✅ Database initialized${NC}"
    echo ""
fi

# Function to cleanup background processes
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${GREEN}🔧 Starting Backend (http://localhost:3012)...${NC}"
cd backend && PORT=3012 pnpm dev &
BACKEND_PID=$!
cd "$SCRIPT_DIR"

# Wait a moment for backend to start
sleep 2

# Start frontend
echo -e "${GREEN}🎨 Starting Frontend (http://localhost:3010)...${NC}"
cd frontend && pnpm dev &
FRONTEND_PID=$!
cd "$SCRIPT_DIR"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Development servers are running!${NC}"
echo ""
echo -e "   ${BLUE}Frontend:${NC} http://localhost:3010"
echo -e "   ${BLUE}Backend:${NC}  http://localhost:3012"
echo ""
echo -e "   Press ${YELLOW}Ctrl+C${NC} to stop all servers"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
