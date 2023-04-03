FROM node:19

RUN npm install -g pnpm@7

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/telegraph... install
RUN pnpm --filter @packages/telegraph-db prisma:generate

ENTRYPOINT ["bash", "./deployment/images/telegraph/entrypoint.sh"]
