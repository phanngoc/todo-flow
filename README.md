# Todo Flow

A full-stack Todo application built with modern technologies.

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Drizzle ORM** - TypeScript ORM
- **SQLite** - Lightweight database
- **Zod** - Schema validation

### Frontend
- **Next.js 15** - React framework
- **shadcn/ui** - UI components
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling

### Shared
- **Zod schemas** - Shared validation schemas
- **TypeScript types** - Shared type definitions

## 📁 Project Structure

```
├── backend/          # NestJS backend API
│   ├── src/
│   │   ├── categories/   # Categories module
│   │   ├── todos/        # Todos module
│   │   ├── database/     # Database configuration & schema
│   │   └── common/       # Shared utilities
│   └── data/             # SQLite database files
├── frontend/         # Next.js frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   └── stores/           # Zustand stores
└── shared/           # Shared schemas & types
    └── src/
        ├── schemas/      # Zod validation schemas
        └── types/        # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/phanngoc/todo-flow.git
cd todo-flow
```

2. Install dependencies:
```bash
pnpm install
```

3. Build shared package:
```bash
cd shared && pnpm build && cd ..
```

4. Setup database:
```bash
cd backend
pnpm db:push
pnpm db:seed  # Optional: seed sample data
cd ..
```

### Development

Run both backend and frontend in development mode:

```bash
./dev.sh
```

Or run separately:

**Backend** (runs on http://localhost:3001):
```bash
cd backend && pnpm dev
```

**Frontend** (runs on http://localhost:3000):
```bash
cd frontend && pnpm dev
```

## 📝 Available Scripts

### Backend
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start:prod` | Run production build |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:seed` | Seed database with sample data |

### Frontend
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |

### Shared
| Script | Description |
|--------|-------------|
| `pnpm build` | Build shared package |
| `pnpm dev` | Build with watch mode |
| `pnpm typecheck` | Type check without emitting |

## 🔧 Environment Variables

### Backend
No environment variables required (uses SQLite local file).

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | Backend API URL |

## 📜 License

MIT License
