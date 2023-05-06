FROM alpine:3.17

ENV NEXT_PUBLIC_INTERNAL_API_URL="build_internal-api-url"
ENV NEXT_PUBLIC_API_URL="build_public-api-url"

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm ci -w @applications/web --include-workspace-root && \
    npm run build:web

ENTRYPOINT ["sh", "./deployment/images/web/entrypoint.sh"]
