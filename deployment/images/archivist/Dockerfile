FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci --workspace=@applications/archivist && \
    npm ci --workspaces=false && \
    npm run prisma:generate --workspace=@applications/archivist

ENTRYPOINT ["sh", "./deployment/images/archivist/entrypoint.sh"]
