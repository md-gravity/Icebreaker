FROM alpine:3.17

RUN apk add --update nodejs npm && \
    npm install -g pnpm@7

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/archivist... install && \
    pnpm --filter @packages/archivist-db prisma:generate

ENTRYPOINT ["sh", "./deployment/images/archivist/entrypoint.sh"]
