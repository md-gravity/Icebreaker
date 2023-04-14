FROM alpine:3.17

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install --workspace=@applications/passport --include-workspace-root

ENTRYPOINT ["sh", "./deployment/images/passport/entrypoint.sh"]
