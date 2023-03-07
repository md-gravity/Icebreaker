FROM node:19

RUN npm install -g pnpm@$pnpm

WORKDIR /app

COPY . .

RUN pnpm --filter @applications/archivist... install

ENTRYPOINT ["bash", "./deployment/images/archivist/entrypoint.sh"]
