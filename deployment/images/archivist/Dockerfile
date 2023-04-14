FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install --workspace=@applications/archivist && \
    npm install --workspaces=false && \
    npm run prisma:generate --workspace=@applications/archivist

ENTRYPOINT ["sh", "./deployment/images/archivist/entrypoint.sh"]
