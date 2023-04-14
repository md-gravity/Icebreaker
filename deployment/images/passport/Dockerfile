FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install --workspace=applications/passport && \
    npm install --workspaces=false && \
    npm run prisma:generate --workspace=applications/passport

ENTRYPOINT ["sh", "./deployment/images/passport/entrypoint.sh"]
