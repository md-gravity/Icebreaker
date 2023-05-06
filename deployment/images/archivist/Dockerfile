FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci -w @applications/archivist --include-workspace-root && \
    npm run build:archivist

ENTRYPOINT ["sh", "./deployment/images/archivist/entrypoint.sh"]
