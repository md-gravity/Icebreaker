FROM alpine:3.17

RUN apk add --update nodejs npm && \
    npm install -g pnpm@8

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/web... install

ENTRYPOINT ["sh", "./deployment/images/web/entrypoint.sh"]
