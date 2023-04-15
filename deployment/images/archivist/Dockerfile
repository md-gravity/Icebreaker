FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install --workspace=@applications/archivist --include-workspace-root

ENTRYPOINT ["sh", "./deployment/images/archivist/entrypoint.sh"]
