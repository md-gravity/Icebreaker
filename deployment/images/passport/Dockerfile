FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci -w @applications/passport --include-workspace-root && \
    npm run build:passport

ENTRYPOINT ["sh", "./deployment/images/passport/entrypoint.sh"]
