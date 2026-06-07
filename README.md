# Trace

Trace is a modern, full-stack personal finance and expense tracking application designed to provide users with deep insights into their financial health. Built with performance and user experience in mind, it leverages cutting-edge web technologies to deliver a responsive, secure, and seamless interface for managing income, tracking expenses, and analyzing spending patterns.

## Features

- **Comprehensive Dashboard:** An interactive overview of your finances, including key metrics, cash flow trends, and recent activity.
- **Transaction Management:** Easily add, edit, delete, and categorize both income and expenses.
- **Advanced Reporting & Analytics:** Visual representations of your financial data, including top spending categories, income vs. expense breakdowns, and historical charts using Recharts.
- **Secure Authentication:** Robust user authentication and session management powered by Clerk.
- **Data Tables with Pagination & Filtering:** Manage large volumes of transaction data effortlessly with TanStack Table.
- **Responsive Design:** A polished, mobile-friendly user interface built with Tailwind CSS v4 and shadcn/ui components.
- **Type-Safe Full-Stack Architecture:** End-to-end type safety using TypeScript, TanStack Start, and Drizzle ORM.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/latest)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v22 or later recommended)
- [Bun](https://bun.sh/) (Package manager)
- A PostgreSQL database

## Environment Setup

1. Clone the repository and navigate to the project root.
2. Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

3. Update the `.env` file with your Clerk and PostgreSQL credentials:

```env
# Clerk Credentials
CLERK_PUBLISHABLE_KEY="your_publishable_key"
CLERK_SECRET_KEY="your_secret_key"
CLERK_SIGN_IN_URL="/sign-in"
CLERK_SIGN_UP_URL="/sign-up"
CLERK_AFTER_SIGN_IN_URL="/dashboard"
CLERK_AFTER_SIGN_UP_URL="/dashboard"

# PostgreSQL Credentials
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USER="postgres"
DATABASE_PASSWORD="password"
DATABASE_NAME="trace"
DATABASE_CA_CERT="" # Required if using managed databases with SSL
```

## Installation

Install the project dependencies using Bun:

```bash
bun install
```

## Database Setup

Initialize your database schema and run migrations using Drizzle Kit:

```bash
# Generate migrations
bun run drizzle:generate

# Run migrations
bun run drizzle:migrate
```

You can view and manage your database data using Drizzle Studio:

```bash
bun run drizzle:studio
```

## Running the Application

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `bun run dev`: Start the development server on port 3000.
- `bun run build`: Build the application for production.
- `bun run preview`: Preview the production build locally.
- `bun run test`: Run the test suite using Vitest.
- `bun run lint`: Run ESLint to check for code issues.
- `bun run format`: Format code using Prettier.
- `bun run typecheck`: Run TypeScript type checking without emitting files.
