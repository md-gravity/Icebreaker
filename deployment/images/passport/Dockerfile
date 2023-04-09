FROM alpine:3.17

RUN apk add --update nodejs npm && \
    npm install -g pnpm@8

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/passport... install && \
    pnpm --filter @packages/passport-db prisma:generate

ENTRYPOINT ["sh", "./deployment/images/passport/entrypoint.sh"]
