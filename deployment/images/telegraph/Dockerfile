FROM alpine:3.17

RUN apk add --update nodejs npm && \
    npm install -g pnpm@7

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/telegraph... install && \
    pnpm --filter @packages/telegraph-db prisma:generate

ENTRYPOINT ["sh", "./deployment/images/telegraph/entrypoint.sh"]
