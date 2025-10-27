# Stage 0: Base image
FROM oven/bun:alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install


# Stage 2: Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL # <--- ADD THIS LINE IN YOUR DOCKERFILE
ENV DATABASE_URL=$DATABASE_URL
RUN bun run build

# Stage 3: Run production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what’s needed for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy any backend routes if needed (e.g. /api folder)
COPY --from=builder /app/app ./app

# Expose port
EXPOSE 3000

# Run the app
CMD ["bun", "run", "server.js"]