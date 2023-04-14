FROM alpine:3.17

RUN apk add --update nodejs npm
WORKDIR /app

COPY . .

RUN npm ci --workspace=applications/web && \
    npm ci --workspaces=false

ENTRYPOINT ["sh", "./deployment/images/web/entrypoint.sh"]
