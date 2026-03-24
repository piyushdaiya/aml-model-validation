FROM node:20-bookworm-slim AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

ARG DATABASE_URL=postgresql://amluser:amlpassword@postgres:5432/aml_db?schema=public
ARG JWT_SECRET=docker-build-secret

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

COPY --from=builder /app ./
COPY docker/web-entrypoint.sh /usr/local/bin/web-entrypoint.sh

RUN chmod +x /usr/local/bin/web-entrypoint.sh

EXPOSE 3000

CMD ["web-entrypoint.sh"]
