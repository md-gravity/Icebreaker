FROM node:19

RUN npm install -g pnpm@7

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/archivist... install
RUN pnpm --filter @packages/archivist-db prisma:generate

ENTRYPOINT ["bash", "./deployment/images/archivist/entrypoint.sh"]
