FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci --workspace=@applications/telegraph --include-workspace-root

ENTRYPOINT ["sh", "./deployment/images/telegraph/entrypoint.sh"]
