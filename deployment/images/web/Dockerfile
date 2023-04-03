FROM node:19

RUN npm install -g pnpm@7

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/web... install

ENTRYPOINT ["bash", "./deployment/images/web/entrypoint.sh"]
