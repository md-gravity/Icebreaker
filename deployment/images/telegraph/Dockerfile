FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install --workspace=applications/telegraph && \
    npm install --workspaces=false && \
    npm run prisma:generate --workspace=applications/telegraph

ENTRYPOINT ["sh", "./deployment/images/telegraph/entrypoint.sh"]
