FROM alpine:3.17

RUN apk add --update nodejs npm && \
    npm install -g pnpm@8

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/telegraph... install && \
    pnpm --filter @applications/telegraph prisma:generate

ENTRYPOINT ["sh", "./deployment/images/telegraph/entrypoint.sh"]
