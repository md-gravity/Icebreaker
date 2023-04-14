FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci --workspace=@applications/passport && \
    npm ci --workspaces=false && \
    npm run prisma:generate --workspace=@applications/passport

ENTRYPOINT ["sh", "./deployment/images/passport/entrypoint.sh"]
