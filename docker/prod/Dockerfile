# ===========================
# Stage 1 - Dependencies
# ===========================
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci

# ===========================
# Stage 2 - Builder
# ===========================
FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

WORKDIR /app/apps/web

RUN npm run build

# ===========================
# Stage 3 - Runner
# ===========================
FROM node:22-alpine AS runner

WORKDIR /app/apps/web

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/web ./

EXPOSE 3000

CMD ["npm", "run", "serve"]
