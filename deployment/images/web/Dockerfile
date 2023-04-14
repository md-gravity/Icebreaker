FROM alpine:3.17

RUN apk add --update nodejs npm
WORKDIR /app

COPY . .

RUN npm install --workspace=applications/web && \
    npm install --workspaces=false

ENTRYPOINT ["sh", "./deployment/images/web/entrypoint.sh"]
