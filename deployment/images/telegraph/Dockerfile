FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci -w @applications/telegraph --include-workspace-root && \
    npm run build:telegraph

ENTRYPOINT ["sh", "./deployment/images/telegraph/entrypoint.sh"]
