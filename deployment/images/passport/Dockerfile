FROM node:19

RUN npm install -g pnpm@$pnpm

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/passport... install
RUN pnpm --filter @packages/passport-db prisma:generate

ENTRYPOINT ["bash", "./deployment/images/passport/entrypoint.sh"]
