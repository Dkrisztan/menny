FROM oven/bun:1 AS install
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM install AS build
COPY . .
RUN bun run build:all

FROM oven/bun:1 AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY server/ ./server/
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-admin ./dist-admin

EXPOSE 3000
CMD ["bun", "run", "server/index.ts"]
